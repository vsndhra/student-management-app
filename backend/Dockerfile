# Use a base image (you can replace "python:3.x" with your desired Python version)
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port that your Flask app will run on
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
