const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "Notes App Backend with JWT Authentication"
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT}`
      }
    ],

    tags: [
      { name: "Users" },
      { name: "Profile" },
      { name: "Notes" },
      { name: "Admin-User" },
      { name: "Admin-Notes" }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      // 🔹 ONLY REQUIRED SCHEMAS (no examples)
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" }
          }
        },

        Note: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            content: { type: "string" },
            user: { type: "string" }
          }
        },

        SuccessResponse: {
          type: "object",
          properties: {
            status: { type: "string" }
          }
        },

        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string" },
            message: { type: "string" }
          }
        }
      }
    }
  },

  apis: ["./docs/*.js"]
};

module.exports = swaggerJsDoc(swaggerOptions);
