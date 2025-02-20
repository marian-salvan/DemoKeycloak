# Use an official Node.js runtime as a parent image
FROM node:22 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a smaller base image for the final stage
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist /app/dist

# Install serve to serve the build output
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the React app
CMD ["serve", "-s", "dist", "-l", "3000"]
