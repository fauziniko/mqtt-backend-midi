const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const uploadRoutes = require('./routes/upload');
const downloadRoutes = require('./routes/download');
const listRoutes = require('./routes/list');
const { swaggerUi, specs } = require('./config/swagger');

dotenv.config();

const app = express();

// Gunakan cors untuk mengizinkan akses dari browser
app.use(cors());

app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', uploadRoutes);
app.use('/api', downloadRoutes);
app.use('/api', listRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
