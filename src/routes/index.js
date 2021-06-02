const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const mongoose = require("mongoose");
const { sign, verify } = require("../utils/jwt");
const { generateHashPassword } = require("../utils/hash");

router.get("/", (req, res) => {
  res.json({ message: "Hello World\n" });
});

//validate e mudar parte de autenticação
router.post("/register", (req, res, next) => {
  const newUser = req.body;
  newUser.password = generateHashPassword(newUser.password);
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

router.post("/login", (req, res, next) => {
  user = userModel.findOne({ email: req.body.email }).exec();
  user
    .then((user) => {
      if (user === null) {
        res.status(422).json({ message: "Email doesn't exist" });
      }
      const input_password = generateHashPassword(
        req.body.password,
        user.password.salt
      );
      if (input_password.hash === user.password.hash) {
        const token = sign(user);
        res.json({ user, token: token });
      } else {
        res.status(422).json({ message: "Incorrect password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/getdetails", (req, res, next) => {
  res.json(req.authUser);
});

module.exports = { url: "/", router };
