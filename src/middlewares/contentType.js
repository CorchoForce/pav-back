function contentType(req, res, next) {
  if (
    !(
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "PATCH"
    ) ||
    req.get("Content-Type").trim().slice(0, 16) === "application/json"
  ) {
    next();
  } else {
    res.status(400).json({ message: "Content-Type Inválido" });
  }
}

module.exports = contentType;
