const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const mongoose = require("mongoose");
const { sign, verify } = require("../utils/jwt");

router.get("/", (req, res) => {
  res.json({ message: "Hello World\n" });
});

//validate e mudar parte de autenticação
router.post("/register", (req, res, next) => {
  const user = new userModel(req.body);
  user
    .save()
    .then((user) => {
      const token = sign(user);
      res.json({ user, token: token });
    })
    .catch((err) => {
      if (err instanceof mongoose.mongo.MongoError && err.code === 11000) {
        res.status(420).json({ message: "Email already registered" });
      } else {
        next(err);
      }
    });
});

router.get("/getdetails", (req, res, next) => {
  res.json(req.authUser);
});

module.exports = { url: "/", router };
