# Use an official Node.js runtime as the base image
FROM node:16 as build
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the Angular app
RUN npm run build --prod
# Use a smaller base image for the final container
FROM nginx:alpine
# Copy the build artifacts to the Nginx web root
COPY --from=build /app/dist/frontend /usr/share/nginx/html
# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
