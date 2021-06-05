const offerModel = require("../models/offers");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

router.post("/", authenticate, (req, res, next) => {
  const user = req.authUser;
  const offer = new offerModel({ user: user._id, ...req.body });
  offer
    .save()
    .then((offer) => {
      res.status(201).json(offer);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(422).send({ err });
      } else {
        next(err);
      }
    });
});

router.get("/search", (req, res, next) => {
  const query = req.query.search;
  offers = offerModel.find({ $text: { $search: query } }).exec();
  offers
    .then((offers) => {
      res.json(offers);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/", (req, res, next) => {
  const baseQuery = {deadline: {$gte: new Date().toISOString()}}
  const query =
    req.query.search === undefined
      ? baseQuery
      : { $text: { $search: req.query.search }, ...baseQuery };
  offers = offerModel.find(query).exec();
  offers
    .then((offers) => {
      res.json(offers);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:offerId", (req, res, next) => {
  offer = offerModel.findById(req.params.offerId).exec();
  offer
    .then((offer) => {
      if (offer === null) {
        res.status(404).json({});
        return;
      }
      res.json(offer);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ error: "Id incorreta" });
      } else {
        next(err);
      }
    });
});

router.put("/:offerId", authenticate, (req, res, next) => {
  const user = req.authUser;
  offer = offerModel
    .findOneAndUpdate({ _id: req.params.offerId, user: user._id }, req.body, { new: true })
    .exec();
  offer
    .then((offer) => {
      if (offer === null) {
        res.status(404).json({});
        return;
      }
      res.json(offer);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ error: "Id incorreta" });
      } else {
        next(err);
      }
    });
});

router.delete("/:offerId", authenticate, (req, res, next) => {
  user = req.authUser;
  offer = offerModel.findOneAndDelete({ _id: req.params.offerId, user: user._id }).exec();
  
  offer
    .then((offer) => {
      if (offer === null) {
        res.status(404).json({});
        return;
      }
      res.status(204).send();
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ error: "Id incorreta" });
      } else {
        next(err);
      }
    });
});

router.get("/mine", authenticate, (req, res, next) => {
  user = req.authUser;
  offers = offerModel.find({ "user": user._id }).exec();
  offers
    .then((offers) => {
      res.json(offers);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = { url: "/offer", router };
