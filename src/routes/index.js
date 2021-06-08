const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const { validateCPF } = require("../utils/cpf");
const mongoose = require("mongoose");
const { sign } = require("../utils/jwt");
const { generateHashPassword } = require("../utils/hash");
const authenticate = require("../middlewares/authenticate");
const validator = require("validator");
const validateUser = require("../services/validation/user");
const sendEmail = require("../utils/sendEmail");

//validate e required error
router.post("/register", (req, res, next) => {
  try {
    validateUser(req.body, { ...validator, cpfValidator: validateCPF });
    const newUser = req.body;
    newUser.password = generateHashPassword(newUser.password);
    const user = new userModel(newUser);
    user
      .save()
      .then((user) => {
        sendEmail(res, user);
      })
      .catch((err) => {
        if (err instanceof mongoose.mongo.MongoError && err.code === 11000) {
          res.status(422).json({ message: "Email ou CPF já registrado" });
        } else {
          next(err);
        }
      });
  } catch (error) {
    res.status(422).json({ message: error });
  }
});

router.post("/login", (req, res, next) => {
  
  user = userModel.findOne({ email: req.body.email }).exec();
  user
    .then((user) => {
      if (user === null) {
        res.status(422).json({ message: "Email não cadastrado" });
        return;
      }

      if (user.verified === false){
        res.status(403).json({message: "Usuário não verificado"});
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
