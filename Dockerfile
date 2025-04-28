# Stage 1: Build the Vite app
FROM node:23-alpine AS build 


# Set the working directory
WORKDIR /react-app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

# Build the Vite application
RUN npm run build

# Substitute environment variables
RUN npx --yes envsub /app/dist/index.html

# Stage 2: Serve the application using Nginx
FROM nginx:1.27-alpine AS final

RUN npm install serve

# Copy the built files from the previous stage
COPY --from=build /react-app/dist ./dist

# Expose the port for the app
EXPOSE 3001

# Copy the template config file
COPY ./nginx-entrypoint.sh /docker-entrypoint.d/nginx-entrypoint.sh
RUN chmod +x /docker-entrypoint.d/nginx-entrypoint.sh


# Expose port 80 and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
