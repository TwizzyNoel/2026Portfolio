# Use Node 22
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3001

# Start the app
CMD ["npm", "start"]