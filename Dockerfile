# # Stage 1: Build the Vite app
# FROM node:18-alpine AS build 

# # Define the build argument
# ARG VITE_CLERK_PUBLISHABLE_KEY

# # Set the environment variable for Vite
# ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

# # Set the working directory
# WORKDIR /react-app

# # Copy package.json and package-lock.json to install dependencies
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the project files
# COPY . .

# # Build the Vite application
# RUN npm run build

# # Stage 2: Serve the app with a lightweight HTTP server
# FROM node:18-alpine 

# # Define the same build argument again for the runtime stage
# ARG VITE_CLERK_PUBLISHABLE_KEY

# # Set the environment variable for runtime
# ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

# # Set the working directory for serving
# WORKDIR /app

# # Copy the built files from the previous stage
# COPY --from=build /react-app/dist /app

# # Expose the port for the app
# EXPOSE 3001

# # Serve the app using a lightweight HTTP server
# CMD ["npx", "serve", "-s", "-l", "3001"]


# Stage 1: Build the React application
FROM node:23-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY npm-shrinkwrap.json* ./
RUN npm ci --silent

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:1.27-alpine AS final

# Set labels for GHCR
LABEL org.opencontainers.image.source=https://github.com/teamyapchat/yapchat-ui
LABEL org.opencontainers.image.description="Frontend for YapChat"
LABEL org.opencontainers.image.licenses=GPLv3

COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
