const express = require("express");
const loader = require("./loaders");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;
require("./config")();
const seed = require("./db/seeds");

const end = loader({
  expressApp: app,
  isTest: process.env.NODE_ENV === "test" ? true : false,
})
  .then(() => {
    return app.listen(PORT, () => console.log(`Server Starting Port ${PORT}`));
  })
  .catch((err) => {
    console.log(`Loader Failed err: ${err}`);
  });

module.exports = { server: app, end };
