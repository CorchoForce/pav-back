const jwt = require("jsonwebtoken");

function sign(data, expires = "7d") {
  console.log(process.env.APP_KEY);
  return jwt.sign(data.toJSON(), process.env.APP_KEY, {
    expiresIn: expires,
  });
}

function verify(token) {
  const data = jwt.verify(token, process.env.APP_KEY);
  return data;
}

module.exports = { sign, verify };
