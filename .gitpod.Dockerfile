# Use an official Node.js LTS version as the base image
FROM node:16

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install Docker for building images within Gitpod
RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh

# Install Python and pip
RUN apt-get update && apt-get install -y python3-pip

# Install MongoDB
RUN apt-get install -y mongodb

# Set working directory
WORKDIR /workspace

# Expose ports
EXPOSE 8080

# Start MongoDB server
RUN mkdir -p /data/db
CMD ["mongod", "--fork", "--logpath", "/var/log/mongodb.log"]

# Start the workspace
CMD ["/bin/bash"]
