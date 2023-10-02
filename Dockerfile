FROM node:18.13.0

# WORKDIR /var/www/html

# COPY package.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "run", "dev"]

# # Base on offical Node.js Alpine image
# FROM node:alpine

# # Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install --production

# Copy all files
COPY ./ ./


# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER 1000
RUN chmod -R 777 /usr/app/.next/cache
# Run npm start script when container starts
CMD [ "npm" , "run" , "start" ]
