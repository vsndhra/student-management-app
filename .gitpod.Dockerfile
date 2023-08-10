# Use the base Gitpod image
FROM gitpod/workspace-full

# Install additional dependencies
RUN sudo apt-get update && sudo apt-get install -y \
    mysql-server \
    mongodb

# Configure MySQL
RUN sudo service mysql start && \
    sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''" && \
    sudo service mysql restart

# Expose the necessary ports
EXPOSE 8080

# Start the workspace
CMD ["sleep", "infinity"]
