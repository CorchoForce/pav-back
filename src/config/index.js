const obj = {};
const config = () => {
  const functions = {
    isProduction: () => obj.isProduction,
  };
  if (obj.initialized !== true) {
    obj.initialized = true;
    if (process.env.PRODUCTION === "FALSE") {
      obj.isProduction = false;
    } else if (process.env.PRODUCTION === "TRUE") {
      obj.isProduction = true;
    } else {
      throw new Error("Incorrect production env value");
    }
  }
  return functions;
};

module.exports = config;
