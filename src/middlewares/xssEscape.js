const { escape } = require("validator");

function transverseObj(inVal) {
  const q = [inVal];
  while (q.length !== 0) {
    const val = q.pop();
    if (typeof val === "object" && val !== null) {
      Object.keys(val).forEach((elem) => {
        const type = typeof val[elem];
        if (type === "string") {
          val[elem] = escape(val[elem]);
        } else if (type === "array" || type === "object") {
          q.push(val[elem]);
        }
      });
    } else if (typeof val === "array") {
      val.forEach((elem) => {
        const type = typeof val[elem];
        if (type === "string") {
          val[elem] = escape(val[elem]);
        } else if (type === "array" || type === "object") {
          q.push(val[elem]);
        }
      });
    } else {
      throw "Unexpected value type";
    }
  }
}

function xssEscape(req, res, next) {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    transverseObj(req.body);
    next();
  } else {
    next();
  }
}

module.exports = xssEscape;
