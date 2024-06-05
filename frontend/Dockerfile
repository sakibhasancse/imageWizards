# Stage 1: Build the application
FROM node:18 AS builder

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:latest

# Copying built assets from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
