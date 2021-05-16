const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World\n" });
});

module.exports = { url: "/", router };
