const express = require("express");
const path = require("path");
const logger = require("../utils/logger");
const fs = require("fs");
const cors = require("cors");
const c = require("../config");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xssEscape = require("../middlewares/xssEscape");
const contentType = require("../middlewares/contentType");

//Initializes express
const init = ({ expressApp: app }) =>
  new Promise((resolve, reject) => {
    const corsOptions = {
      origin: c().isProduction() ? process.env.FRONT_URL : "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors(corsOptions));
    app.use(contentType);
    app.use(express.json());
    app.use(xssEscape);
    //Serie de headers de segurança
    app.use(helmet());
    //Sanitize for nosql injection
    app.use(mongoSanitize());

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
