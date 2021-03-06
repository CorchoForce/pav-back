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
  valid: {
    required: true,
    type: Boolean,
    default: false,
  },
  requirements: {
    type: String,
  },
  site: {
    type: String,
  },
  tags: {
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
  contactEmail: {
    required: true,
    type: String,
  },
  /*
  institution: {
    name: {
      required = true,
      type = String
    },
    description: {
      required = true, 
      type = String
    }
  },
  */
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
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
