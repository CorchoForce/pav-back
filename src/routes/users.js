const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  users = userModel.find({}).exec();
  users
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = { url: "/user", router };
