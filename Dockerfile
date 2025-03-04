# Use official Node.js image
FROM alpine/node:latest

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/package*.json ./
RUN npm install
COPY backend ./

# Copy frontend files into `public/` (to be served by Express)
COPY frontend /app/public

# Expose port 3000
EXPOSE 3000

# Start backend (which serves frontend)
CMD ["node", "src/app.js"]
