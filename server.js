require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My contacts api",
      version: "1.0.0",
      description: "This is an API for managing contact data.",
    },
  },
  apis: ["./routes/index.js"],
};

const specs = swaggerJsdoc(options);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(require('./routes/'));


// Starting the server
const port = process.env.PORT || 8080;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`Start the server ${host}:${port}`);
});
