FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application (Vite compiles everything into the /dist folder)
RUN npm run build

# Install the exact static server globally
RUN npm install -g serve

# Start the server targeting the compiled /dist folder
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]
