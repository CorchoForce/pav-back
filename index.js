const dbMem = require("../db/memory");
const mongoose = require("mongoose");
const offerModel = require("../models/offers");

const closeDB = () => dbMem.closeDatabase();

dbMem.connect().then(() => {
  const offer = new offerModel(body);
  offer
    .save()
    .then((_) => {
      return offerModel
        .find({})
        .exec()
        .then((offers) => {
          console.log(offers);
          closeDB();
        });
    })
    .catch((err) => {
      throw err;
    });
  return;
});
