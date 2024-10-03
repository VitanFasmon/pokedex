# Use the official Node.js image as a base image
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve the built application
FROM nginx:alpine

# Copy built files from the previous stage to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default port for nginx
EXPOSE 80

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
