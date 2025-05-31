const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "Tooth Lengths API",
    description: "API for managing approximate tooth lengths",
  },
  host: "cse341-crud-jg27.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
