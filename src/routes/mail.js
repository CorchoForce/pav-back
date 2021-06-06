const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const mongoose = require("mongoose");
const sendEmail = require("../utils/sendEmail");
const authenticate = require("../middlewares/authenticate");

router.post('/send', (req, res, next) => {
  const user = userModel.findOne({ $and: [{ email: req.body.email }, { verified: false }] }).exec();
  user
  .then((user) => {
    sendEmail(res, user);
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      res.status(400).send({ error: "Email incorreto" });
    } else{
      next(err);
    }
  });
   
});

router.post('/verify', authenticate, (req, res, next) => {
  const user = req.authUser;
  if (user === null) {
    return (res.status(400).json({ message: "Usuário não encontrado." }));
  }

  const updatedUser = userModel.findOneAndUpdate({ $and: [{ _id: user._id }, { verified: false }] }, { verified : true }).exec();
  updatedUser
    .then(() => {
      res.status(200).send("Usuário verificado.");
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ error: "Usuário não encontrado" });
      } else {
        next(err);
      }
    });
});

module.exports = { url: "/mail", router };