from flask import Flask, request, jsonify
from mongoengine import connect
from flask_cors import CORS 
from ORM.assignment import Assignment
from ORM.submission import Submission
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL 
import jwt
import os
from datetime import datetime, time

app = Flask(__name__)
CORS(app,  origins=[os.environ.get('BACKEND_URL')])


# app.config['MYSQL_HOST'] = "127.0.0.1"
app.config['MYSQL_HOST'] = "172.17.0.1"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = "root"
app.config['MYSQL_PORT'] = 3306
# app.config['MYSQL_PASSWORD'] = ""
app.config['MYSQL_DB'] = "student_management_system"
app.config['SECRET_KEY'] = 'yplshtjaksywqosndhfyrksmalpsdjuf'
UPLOAD_FOLDER = 'uploads'  # Specify the folder where files will be saved
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Mongodb connection
connect(db="student-management", host="mongodb://localhost:27017")

# MySQL connection
mysql = MySQL(app)

# Encrypting the password
bcrypt = Bcrypt(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/', methods=['GET'])
def check():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users')
    users = cursor.fetchone()
    cursor.close()
    return jsonify({'users': users})

@app.route('/get_backend_url', methods=['GET'])
def get_backend_url():
    backend_url = os.environ.get('BACKEND_URL')
    if backend_url:
        return jsonify({"backend_url": backend_url})
    else:
        return jsonify({"message": "BACKEND_URL is not set"}), 500

# Route for user registration
@app.route('/api/register', methods=['POST', 'OPTIONS'])
def register_user():

    data = request.get_json()

    name = data['name']
    email = data['email']
    role = data['role']
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO users (name, email, role, password) VALUES (%s, %s, %s, %s)", (name, email, role, password))
    try:
        mysql.connection.commit()
        return jsonify({'success': 'User registered successfully.'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    cursor.close()
     


# Route for user login
@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():

    data = request.get_json()

    email = data['email']
    password = data['password']

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT id, name, email, role, password FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()

    if user:
        user_id, name, email, role, hashed_password = user
        if bcrypt.check_password_hash(hashed_password, password):
            # Password is correct, create a JWT token
            token_payload = {
                'name': name,
                'role': role,
                'email': email
            }
            token = jwt.encode(token_payload, app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

            return jsonify({'Success': 'Login successful.','token': token}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    else:
        return jsonify({'error': 'User not found'}), 404

# Route for profile creation
@app.route('/api/update', methods=['POST'])
def updateUser():

    data = request.get_json()
    
    if(data['role'] == 'student'):
        
        # Retrieve values from data into the variables
        name = data['name']
        rollno = data['rollno']
        dob = data['dob']
        email = data['email']
        phone = data['phone']
        
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT COUNT(*) FROM students WHERE email = %s", (email,))
        result = cursor.fetchone()[0]

        if result > 0:
            
            # Email exists, update the data based on the role
            cursor.execute("UPDATE students SET name = %s, rollno = %s, dob = %s, phone = %s WHERE email = %s",
                                   (name, rollno, dob, phone, email))
            try:
                mysql.connection.commit()
                cursor.close()
                return jsonify({'success': 'User updated successfully.'}), 201
            except Exception as e:
                return jsonify({'error': str(e)}), 500

        else:
            
            # Email does not exist, insert the data based on the role
            cursor.execute("INSERT INTO students (name, rollno, dob, phone, email) VALUES (%s, %s, %s, %s, %s)",
                                   (name, rollno, dob, phone, email))
            try:
                mysql.connection.commit()
                cursor.close()
                return jsonify({'success': 'User updated successfully.'}), 201
            except Exception as e:
                return jsonify({'error': str(e)}), 500
    
    elif(data['role'] == 'staff'):
    
        # Retrieve values from data into the variables
        name = data['name']
        staffid = data['staffid']
        phone = data['phone']
        email = data['email']
        
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT COUNT(*) FROM teachers WHERE email = %s", (email,))
        result = cursor.fetchone()[0]
        if result > 0:
            
            # Email exists, update the data based on the role
            cursor.execute("UPDATE teachers SET name = %s, staffid = %s, phone = %s WHERE email = %s",
                                   (name, staffid, phone, email))
            try:
                mysql.connection.commit()
                cursor.close()
                return jsonify({'success': 'User updated successfully.'}), 201
            except Exception as e:
                return jsonify({'error': str(e)}), 500

        else:
            
            # Email does not exist, insert the data based on the role
            cursor.execute("INSERT INTO student (name, staffid, email, phone) VALUES (%s, %s, %s, %s)",
                                   (name, staffid, email, phone))
            try:
                mysql.connection.commit()
                cursor.close()
                return jsonify({'success': 'User updated successfully.'}), 201
            except Exception as e:
                return jsonify({'error': str(e)}), 500

# Route for adding assignments
@app.route('/api/addAssignment', methods=['POST'])
def addAssignment():

    assignment = Assignment()
    data = request.get_json()

    assignment.title = data['title']
    assignment.description = data['description']
    assignment.date = str(datetime.strptime(data['date'], '%Y-%m-%d').date())
    assignment.time = str(datetime.strptime(data['time'], '%H:%M').time())
    assignment.marks = data['marks']
    assignment.status = data['status']

    try:
        assignment.save()
        return jsonify({'success': 'Assignment added successfully.'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route for getting assignments
@app.route('/api/getAssignment', methods=['GET']) 
def getAssignment():

    try:
        assignments = Assignment.objects()  # Retrieve all assignments from the collection
        assignment_list = []

        for assignment in assignments:
            assignment_data = {
                'title': assignment.title,
                'description': assignment.description,
                'due_date': assignment.date,
                'time': assignment.time,
                'marks': assignment.marks,
                'status': assignment.status
            }
            assignment_list.append(assignment_data)

        # return jsonify({'Success': 'successful.','assignments': assignment_list}), 200
        return jsonify({'assignments': assignment_list }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route for assignment submissions
@app.route('/api/submitAssignment', methods=['POST'])
def submitAssignment():

    submission = Submission()
    data = request.get_json()
    current = datetime.now()

    uploaded = data['file']
    filename = os.path.join(app.config['UPLOAD_FOLDER'], uploaded)

    submission.name = data['name']
    submission.rollno = data['rollno']
    submission.title = data['title']
    submission.date = current.strftime("%Y-%m-%d")
    submission.time = current.strftime("%H:%M:%S.%f")
    submission.file = filename
    try:
        submission.save()
        return jsonify({'success': 'Assignment submitted successfully.'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/getSubmission', methods=['GET'])
def getSubmission():

    try:
        submissions = Submission.objects()  # Retrieve all assignments from the collection
        submission_list = []

        for submission in submissions:
            submission_data = {
                'name': submission.name,
                'rollno': submission.rollno,
                'title': submission.title,
                'date': submission.date,
                'time': submission.time,
                'file': submission.file
            }
            submission_list.append(submission_data)

        return jsonify({'submissions': submission_list }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Route for marks entry 
@app.route('/marks', methods=['POST'])
def enter_marks():
    data = request.get_json()
    # Validate data and save marks to the database
    # Return appropriate response or error messages.
    return jsonify({'message': 'Marks entered successfully.'}), 201

if __name__ == '__main__':
    #app.run(debug=True, host='192.168.0.106')
    app.run(debug=True,host='0.0.0.0', port=5000)
