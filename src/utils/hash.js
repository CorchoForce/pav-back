const crypto = require("crypto");

function generateSalt(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
}

function generateHashPassword(password, iSalt) {
  const salt = iSalt || generateSalt(32);
  console.log(salt, iSalt);
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  const value = hash.digest("hex");
  return {
    salt: salt,
    hash: value,
  };
}

module.exports = { generateHashPassword };
