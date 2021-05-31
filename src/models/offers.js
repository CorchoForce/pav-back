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
  pay: String,
  beginningDate: Date,
  localization: String,
  neededHours: String,
});

offerSchema.index({
  title: "text",
  type: "text",
  requirements: "text",
  description: "text",
  tags: "text",
});

module.exports = mongoose.model("Offer", offerSchema);
