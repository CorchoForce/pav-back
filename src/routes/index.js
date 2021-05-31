const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.json({ message: "Hello World\n" });
});

//validate e mudar parte de autenticação
router.post("/register", (req, res, next) => {
  const user = new userModel(req.body);
  user
    .save()
    .then((user) => {
      const token = jwt.sign(user.toJSON(), process.env.APP_KEY, {
        expiresIn: "1800s",
      });
      res.json({ user, token: token });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = { url: "/", router };
