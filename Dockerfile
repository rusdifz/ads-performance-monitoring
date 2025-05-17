# Gunakan image Node.js versi LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code ke dalam container
COPY . .

# Build aplikasi 
RUN npm run build

# Jalankan aplikasi
CMD ["npm", "run", "start:prod"]

# Expose port 
EXPOSE 3000