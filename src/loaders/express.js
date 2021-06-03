const express = require("express");
const path = require("path");
const logger = require("../utils/logger");
const fs = require("fs");
const cors = require("cors");
const c = require("../config");
const mongoSanitize = require("express-mongo-sanitize");

//Initializes express
const init = ({ expressApp: app }) =>
  new Promise((resolve, reject) => {
    const corsOptions = {
      //origin: c().isProduction() ? process.env.FRONT_URL : "*",
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    //Sanitize for nosql injection
    app.use(mongoSanitize());

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/build'));
    }
    
    app.get('*', (request, response) => {
      response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

    //loads every route file
    try {
      fs.readdirSync("./src/routes").forEach((file) => {
        const r = require(`../routes/${file.slice(0, -3)}`);
        app.use(r.url, r.router);
      });
    } catch (err) {
      reject(err);
    }
    //404 error handler middleware
    app.use(function (req, res, next) {
      res.status(404).json({ error: "Route NOT FOUND" });
    });

    //Uncaught error handler middleware
    app.use(function (err, req, res, next) {
      console.log(err.stack);
      res.status(500).send({ error: "Unexpected Error" });
    });
    resolve();
  });

module.exports = init;
