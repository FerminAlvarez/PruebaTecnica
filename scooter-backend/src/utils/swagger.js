const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require("path");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Scooter API",
      version: "1.0.0",
    },
  },
  apis: [`${path.join(__dirname, "../routes/*.router.js")}`],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}
module.exports = swaggerDocs;
