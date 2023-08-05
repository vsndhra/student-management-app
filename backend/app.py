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

    # if User.objects(email=data['email']).first():
    #     return jsonify({'error': 'User with this email already exists.'}), 409
    # else:
    #     user = User()
    #     user.name = data['name']
    #     user.email = data['email']
    #     user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    #     user.role = data['role']
    #     try:
    #         user.save()
    #         return jsonify({'success': 'User registered successfully.'}), 201
    #     except Exception as e:
    #         return jsonify({'error': str(e)}), 500

    name = data['name']
    email = data['email']
    role = data['role']
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # MySQL version
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
    
    # if not data.get('email') or not data.get('password'):
    #     return jsonify({'error': 'Please provide email and password.'}), 400

    # # Check if the user with the given email exists in the database
    # user = User.objects(email=data['email']).first()
    # if not user:
    #     return jsonify({'error': 'User not found.'}), 404
    
    # if bcrypt.check_password_hash(user.password, data['password']):
    #     token = jwt.encode({'name': user.name, 'email': user.email, 'role': user.role}, app.config['SECRET_KEY'], algorithm='HS256')
    #     token_str = token.decode('utf-8')
    #     return jsonify({'message': 'Login successful.', 'token': token_str}), 200
    # else:
    #     return jsonify({'error': 'Invalid Login credentials.'}), 401

    # MySQL Version
    email = data['email']
    password = data['password']

    # MySQL version
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
            }
            token = jwt.encode(token_payload, app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

            return jsonify({'message': 'Login successful.','token': token}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    else:
        return jsonify({'error': 'User not found'}), 404


# Route for profile creation
@app.route('/profile', methods=['POST'])
def create_profile():
    data = request.get_json()
    # Return appropriate response or error messages.
    return jsonify({'message': 'Profile created successfully.'}), 201

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
