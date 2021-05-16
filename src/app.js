const express = require("express");
const loader = require("./loaders");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;
const c = require("./config")();
const seed = require("./db/seeds");
const loadDB = c.isProduction() ? new Promise((resolve, _) => resolve()) : seed;

loader({
  expressApp: app,
})
  .then(() => loadDB)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Starting Port ${PORT}`));
  })
  .catch((err) => {
    console.log(`Loader Failed err: ${err}`);
  });
