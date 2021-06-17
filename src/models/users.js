const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  verified:{
    type:Boolean,
    required:true,
    default:false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  CPF: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    required:true,
    default:Date.now(),
  },
  college: {
    type: String,
    required: true,
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject(); //or var obj = this;
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
