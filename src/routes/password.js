const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const mongoose = require("mongoose");
const { sign } = require("../utils/jwt");
const sendPasswordEmail = require("../utils/sendPasswordEmail");
const authenticate = require("../middlewares/authenticate");
const { restart } = require("nodemon");
const { generateHashPassword } = require("../utils/hash");


router.post('/', (req, res, next) => {
  const user = userModel.findOne({email: req.body.email}).exec();
  user
  .then((user) => {
    sendPasswordEmail(res, user);
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      res.status(400).json({ error: "Email não encontrado" });
    } else{
      next(err);
    }
  });
   
});

router.put('/', (req, res, next) => {
  const user = req.authUser;
  const updatedUser = userModel.findOneAndUpdate({ _id: user._id }, { password: generateHashPassword(req.body.password) }).exec();
  updatedUser
    .then((user) => {
      if(user === null) {
        res.status(422).json({ message: "Não foi possível alterar a senha." })
      } else {
        const token = sign(user);
        res.status(200).json({ message: "Senha alterada.", token: token });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = { url: "/recover_password", router };