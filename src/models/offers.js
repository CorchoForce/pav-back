const mongoose = require("mongoose");
const { Schema } = mongoose;

const offerSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  requirements: {
    required: true,
    type: String,
  },
  site: {
    required: true,
    type: String,
  },
  tags: {
    required: true,
    type: [String],
  },
  description: {
    required: true,
    type: String,
  },
  deadline: {
    required: true,
    type: Date,
  },
  pay: {
    required: true,
    type: String,
  },
  beginningDate: {
    required: true,
    type: Date,
  },
  localization: {
    required: true,
    type: String,
  },
  neededHours: {
    required: true,
    type: String,
  },
});

offerSchema.index({
  title: "text",
  type: "text",
  requirements: "text",
  description: "text",
  tags: "text",
});

module.exports = mongoose.model("Offer", offerSchema);
