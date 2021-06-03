const offerModel = require("../models/offers");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//cuspil tem que tratar os erros de validação melhor aqui
router.post("/", (req, res, next) => {
  const offer = new offerModel(req.body);
  offer
    .save()
    .then((offer) => {
      res.status(201).json(offer);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ err });
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
  const query =
    req.query.search === undefined
      ? {}
      : { $text: { $search: req.query.search } };
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

router.put("/:offerId", (req, res, next) => {
  offer = offerModel
    .findByIdAndUpdate(req.params.offerId, req.body, { new: true })
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

router.delete("/:offerId", (req, res, next) => {
  offer = offerModel.findByIdAndRemove(req.params.offerId).exec();
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

module.exports = { url: "/offer", router };
