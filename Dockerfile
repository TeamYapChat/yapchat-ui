# Stage 1: Build the Vite app
FROM node:23-alpine AS build 

# Define the build argument
ARG VITE_CLERK_PUBLISHABLE_KEY

# Set the environment variable for Vite
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

# Set the working directory
WORKDIR /react-app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

RUN echo "VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}" > .env.production

# Build the Vite application
RUN npm run build

# Stage 2: Serve the app with a lightweight HTTP server
FROM node:23-alpine AS runner

# Set the working directory for serving
WORKDIR /app

RUN npm install serve

# Copy the built files from the previous stage
COPY --from=build /react-app/dist ./dist

# Expose the port for the app
EXPOSE 3001

# Serve the app using a lightweight HTTP server
CMD ["npx", "serve", "-s", "dist", "-l", "3001"]
