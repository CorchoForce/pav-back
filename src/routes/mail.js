const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const mongoose = require("mongoose");
const sendEmail = require("../utils/sendEmail");
const authenticate = require("../middlewares/authenticate");

router.post('/send', (req, res, next) => {
  const user = userModel.findOne({$and:[{email: req.query.email}, {verified: false}]}).exec();
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

router.post('/verify', authenticate, (req, res, next) =>{
  const user = req.authUser;
  user
    .then((user) => {
      if (user === null) {
        res.status(422).json({ message: "Usuário já foi verificado" });
        return;
      }
      userModel.findOneAndUpdate({ $and: [{ _id: user._id }, { verified: false }] }, {verified:true})
        .exec();

      res.status(200).send("Usuário acabou de ser verificado");
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