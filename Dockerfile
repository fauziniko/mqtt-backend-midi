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

# Pastikan folder storage dan uploads ada dan memiliki hak akses yang cukup
RUN mkdir -p storage uploads && chmod -R 777 storage uploads

# Deklarasikan volume untuk penyimpanan data secara permanen
VOLUME ["/app/storage", "/app/uploads"]

# Ekspos port yang digunakan oleh aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "src/app.js"]
