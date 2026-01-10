const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes App API",
      version: "1.0.0",
      description: "Backend API documentation"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },

  // 👇 IMPORTANT PART
  apis: ["./docs/*.js"]
};

module.exports = swaggerJsDoc(swaggerOptions);
