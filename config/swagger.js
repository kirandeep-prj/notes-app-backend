const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "Notes App Backend with JWT Authentication"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
       servers: [
      {
         url: `http://localhost:${process.env.PORT}`
      }
    ]
  },
  apis: ["./docs/*.js"]
};

module.exports = swaggerJsDoc(swaggerOptions);

