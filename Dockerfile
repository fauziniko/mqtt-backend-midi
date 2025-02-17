FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Salin file package.json dan package-lock.json agar dependency bisa diinstal terlebih dahulu
COPY package*.json ./

# Install dependencies (gunakan --production jika hanya ingin dependencies runtime)
RUN npm install --production

# Salin file .env agar environment variables tersedia di container
COPY .env .env

# Salin seluruh source code
COPY . .

# Ekspose port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "src/app.js"]
