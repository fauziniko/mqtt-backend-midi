# Gunakan Node.js versi terbaru (disarankan LTS)
FROM node:18-alpine

# Atur direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json untuk menginstall dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode proyek ke dalam container
COPY . .

# Buat folder src/storage dan uploads dengan permission yang sesuai
RUN mkdir -p src/storage uploads && chmod -R 777 src/storage uploads

# Deklarasikan volume untuk penyimpanan data secara permanen
VOLUME ["/app/src/storage", "/app/uploads"]

# Ekspos port yang digunakan oleh aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "src/app.js"]
