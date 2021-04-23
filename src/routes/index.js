const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello3" });
});

module.exports = { url: "/", router };
