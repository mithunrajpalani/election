FROM node:22

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application (Vite compiles everything into the /dist folder)
RUN npm run build

# Install the exact static server globally
RUN npm install -g serve

# Start the server targeting the compiled /dist folder
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]
