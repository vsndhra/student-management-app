from flask import Flask, request, jsonify
from mongoengine import connect
from flask_cors import CORS 
from ORM.user import User
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL 
import jwt


app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = "127.0.0.1"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = ""
app.config['MYSQL_DB'] = "student-management-app"
app.config['SECRET_KEY'] = 'yplshtjaksywqosndhfyrksmalpsdjuf'

# Mongodb connection
connect(db="student-management", host="mongodb://localhost:27017")

# MySQL connection
mysql = MySQL(app)

# Encrypting the password
bcrypt = Bcrypt(app)

# Route for user registration
@app.route('/api/register', methods=['POST'])
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
@app.route('/api/login', methods=['POST'])
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

            return jsonify({'message': 'Login successful.','token': token}), 200
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

# Route for marks entry 
@app.route('/marks', methods=['POST'])
def enter_marks():
    data = request.get_json()
    # Validate data and save marks to the database
    # Return appropriate response or error messages.
    return jsonify({'message': 'Marks entered successfully.'}), 201

if __name__ == '__main__':
    #app.run(debug=True, host="192.168.0.106")
    app.run(debug=True, host='192.168.0.106')
