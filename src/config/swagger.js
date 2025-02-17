const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MQTT Backend API',
      version: '1.0.0',
      description: 'API documentation for MQTT Backend',
    },
    servers: [
      {
        url: 'https://midi-new.coolify.apitestlab.my.id',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};