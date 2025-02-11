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
