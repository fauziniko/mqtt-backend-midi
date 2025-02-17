const express = require('express');
const dotenv = require('dotenv');
const uploadRoutes = require('./routes/upload');
const downloadRoutes = require('./routes/download');
const listRoutes = require('./routes/list');
const { swaggerUi, specs } = require('./config/swagger');

dotenv.config();

const app = express();
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', uploadRoutes);
app.use('/api', downloadRoutes);
app.use('/api', listRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
