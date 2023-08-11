-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS student_management_system;
USE student_management_system;

-- Create the 'users' table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    role VARCHAR(10),
    password VARCHAR(500)
);

-- Create the 'teachers' table
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    staffid VARCHAR(10),
    email VARCHAR(50),
    phone VARCHAR(12)
);

-- Create the 'students' table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    rollno VARCHAR(10),
    dob DATE,
    email VARCHAR(50),
    phone VARCHAR(12)
);

-- Insert data into the 'users' table
INSERT INTO users (name, email, role, password) VALUES
    ('Athirai', 'rai@gmail.com', 'staff', 'password'),
    ('Abishek', 'shek@gmail.com', 'student', 'password');
