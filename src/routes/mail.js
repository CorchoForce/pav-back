const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const mongoose = require("mongoose");
const { sign } = require("../utils/jwt");
const sendEmail = require("../utils/sendEmail");
const authenticate = require("../middlewares/authenticate");
const { restart } = require("nodemon");

router.post('/send', (req, res, next) => {
  const user = userModel.findOne({ $and: [{ email: req.body.email }, { verified: false }] }).exec();
  user
  .then((user) => {
    sendEmail(res, user);
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      res.status(400).json({ error: "Email incorreto" });
    } else{
      next(err);
    }
  });
   
});

router.post('/verify', authenticate, (req, res, next) => {
  const user = req.authUser;
  const updatedUser = userModel.findOneAndUpdate({ $and: [{ _id: user._id }, { verified: false }] }, { verified : true }, {new:true}).exec();
  updatedUser
    .then((user) => {
      if(user === null) {
        res.status(422).json({ message: "Usuário já verificado" })
      } else {
        const token = sign(user);
        res.status(200).json({ message: "Usuário verificado.", token: token });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = { url: "/mail", router };