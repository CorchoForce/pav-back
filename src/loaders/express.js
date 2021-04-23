const express = require("express");
const path = require("path");
const logger = require("../services/logger");
const fs = require("fs");
const cors = require("cors");

//Initializes express
const init = ({ expressApp: app }) =>
  new Promise((resolve, reject) => {
    let isProd;
    if (process.env.PRODUCTION === "FALSE") {
      isProd = false;
    } else if (process.env.PRODUCTION === "TRUE") {
      isProd = true;
    } else {
      reject("Incorrect production env value");
    }
    const corsOptions = {
      origin: isProd ? process.env.FRONTURL : "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors(corsOptions));
    app.use(express.json());
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
      const filepath = path.join("../", "src/logs/errors");
      logger(filepath, `\n ${err.stack}`).catch((err) => {
        console.log(`Logger failed error: ${err}`);
      });
      res.status(500).send({ error: "Unexpected Error" });
    });
    resolve();
  });

module.exports = init;
