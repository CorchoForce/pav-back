const { verify } = require("../utils/jwt");
const jwt = require("jsonwebtoken");

function getToken(req, res, next) {
  const data = req.headers.authorization;
  if (data !== undefined && data.substring(0, 7) === "Bearer ") {
    const token = data.substring(7);
    try {
      const entity = verify(token);
      delete entity.iat;
      delete entity.exp;
      req.authUser = entity;
      next();
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Token expired" });
      } else if (e instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Invalid Signature" });
      } else {
        next(e);
      }
    }
  } else {
    req.authUser = null;
    next();
  }
}

module.exports = getToken;
