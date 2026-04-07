const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Eventos",
      version: "1.0.0",
      description:
        "API REST para gerenciamento de eventos, participantes e inscrições",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
        description: "Servidor",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;