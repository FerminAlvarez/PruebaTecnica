const app = require("../app");
const swaggerDocs = require("../utils/swagger");

async function main() {
  try {
    app.listen(process.env.PORT_HOST);

    swaggerDocs(app, process.env.PORT_HOST);

    console.log("Served started on PORT:" + process.env.PORT_HOST);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
