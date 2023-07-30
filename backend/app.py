from flask import Flask, request, jsonify
from mongoengine import connect
from flask_cors import CORS 
from ORM.user import User
from flask_bcrypt import Bcrypt
from flask_jwt import JWT, jwt_required, current_identity

app = Flask(__name__)
CORS(app)

connect(db="student-management", host="mongodb://localhost:27017")
bcrypt = Bcrypt(app)

# Route for user registration
@app.route('/api/register', methods=['POST'])
def register_user():

    data = request.get_json()

    # Check if the user with the given email already exists in the database
    if User.objects(email=data['email']).first():
        return jsonify({'error': 'User with this email already exists.'}), 409
    else:
        # Create a new User instance using the data from the Angular component
        user = User()
        user.name = data['name']
        user.email = data['email']
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user.role = data['role']

        try:
            # Save the new user to the database
            user.save()
            return jsonify({'success': 'User registered successfully.'}), 201

        except Exception as e:
            # Handle any exceptions that might occur during database operation
            return jsonify({'error': str(e)}), 500

# Route for user login
@app.route('/api/login', methods=['POST'])
def login():

    data = request.get_json()
    
    # Validate data (you can add more validation checks if required)
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Please provide email and password.'}), 400

    # Check if the user with the given email exists in the database
    user = User.objects(email=data['email']).first()
    if not user:
        return jsonify({'error': 'User not found.'}), 404
    
    # Check if the provided password matches the hashed password in the database
    if bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login successful.'}), 200
    else:
        return jsonify({'error': 'Invalid Login credentials.'}), 401


# Route for profile creation
@app.route('/profile', methods=['POST'])
#@requires_auth('student')  # Only students can create their profiles
def create_profile():
    data = request.get_json()
    # Validate data and save profile to the database
    # You can use the StudentProfile or StaffProfile models from the models.py file to save profile details.
    # Return appropriate response or error messages.
    return jsonify({'message': 'Profile created successfully.'}), 201

# Route for marks entry (accessible only to staff)
@app.route('/marks', methods=['POST'])
#@requires_auth('staff')  # Only staff can enter marks
def enter_marks():
    data = request.get_json()
    # Validate data and save marks to the database
    # Return appropriate response or error messages.
    return jsonify({'message': 'Marks entered successfully.'}), 201

if __name__ == '__main__':
    #app.run(debug=True, host="192.168.0.106")
    app.run(debug=True)
