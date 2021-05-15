const mongoose = require("mongoose");
const { Schema } = mongoose;

const offerSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  type: String,
  requirements: String,
  site: String,
  tags: [String],
  description: String,
  deadline: Date,
  pay: Number,
  beginningDate: Date,
  localization: String,
  neededHours: Number,
  user: {
    description: String,
    email: String,
  },
});

const offerModel = mongoose.model("Offer", offerSchema);

module.exports = offerModel;
