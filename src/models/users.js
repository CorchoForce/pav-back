const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  CPF: String,
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject(); //or var obj = this;
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
