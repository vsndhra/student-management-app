# Use the official Gitpod workspace image as the base image
FROM gitpod/workspace-full

# Set environment variables to non-interactive mode
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js for Angular
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && \
    sudo apt-get install -y nodejs

# Install Python packages for Flask backend
COPY backend/requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

# Install MongoDB
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    sudo apt-get update && \
    sudo apt-get install -y mongodb-org

# Install MySQL
RUN sudo apt-get install -y mysql-server

# Set up MongoDB
RUN sudo service mongod start && \
    mongo admin --eval "db.createUser({user: 'your_mongodb_user', pwd: 'your_mongodb_password', roles: ['root']})"

# Set up MySQL
RUN sudo service mysql start && \
    sudo mysql -e "CREATE DATABASE your_mysql_database;" && \
    sudo mysql -e "CREATE USER 'your_mysql_user'@'localhost' IDENTIFIED BY 'your_mysql_password';" && \
    sudo mysql -e "GRANT ALL PRIVILEGES ON your_mysql_database.* TO 'your_mysql_user'@'localhost';" && \
    sudo mysql -e "FLUSH PRIVILEGES;"

# Set the working directory
WORKDIR /workspace

# Expose ports for Angular and Flask
EXPOSE 4200 5000

# Start the workspace
CMD ["sleep", "infinity"]
