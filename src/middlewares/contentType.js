function contentType(req, res, next) {
  console.log("FLAAAAAAAAAAAAAAAAAAAAG");
  console.log(req.is("application/json"));
  if (
    !(
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "PATCH"
    ) ||
    req.is("application/json") === "application/json"
  ) {
    next();
  } else {
    res.status(400).json({ message: "Content-Type Inválido" });
  }
}

module.exports = contentType;
