const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const mongoose = require("mongoose");
const { sign, verify } = require("../utils/jwt");
const { generateHashPassword } = require("../utils/hash");
const authenticate = require("../middlewares/authenticate");

router.get("/", (req, res) => {
  res.json({ message: "Hello World\n" });
});

router.post("/test", (req, res) => {
  res.json(req.body);
});

//validate e reuuired error
router.post("/register", (req, res, next) => {
  const newUser = req.body;
  newUser.password = generateHashPassword(newUser.password);
  const user = new userModel(newUser);
  user
    .save()
    .then((user) => {
      const token = sign(user);
      res.status(201).json({ user, token: token });
    })
    .catch((err) => {
      if (err instanceof mongoose.mongo.MongoError && err.code === 11000) {
        res.status(422).json({ message: "Email já registrado" });
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
        res.status(422).json({ message: "Email não cadastrado" });
        return;
      }
      const input_password = generateHashPassword(
        req.body.password,
        user.password.salt
      );
      if (input_password.hash === user.password.hash) {
        const token = sign(user);
        res.json({ user, token: token });
      } else {
        res.status(422).json({ message: "Senha incorreta" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/getdetails", authenticate, (req, res, next) => {
  res.json(req.authUser);
});

module.exports = { url: "/", router };
