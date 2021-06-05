const offerModel = require("../models/offers");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, (req, res, next) => {
    user = req.authUser;
    offers = offerModel.find({ "user": user._id }).exec();
    offers
        .then((offers) => {
            res.json(offers);
        })
        .catch((err) => {
            throw err;
        });
});

module.exports = { url: "/myoffers", router };
