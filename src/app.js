const express = require('express');
const dotenv = require('dotenv');
const uploadRoutes = require('./routes/upload');
const downloadRoutes = require('./routes/download');
const listRoutes = require('./routes/list');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', downloadRoutes);
app.use('/api', listRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
