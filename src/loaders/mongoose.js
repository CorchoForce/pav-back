const mongoose = require("mongoose");
const init = (config) => {
  if (config.isTest) {
    const dbMem = require("../db/memory");
    return dbMem.connect();
  }
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT,
  } = process.env;

  const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  const url =
    process.env["ENV"] === "production"
      ? `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}`
      : `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  console.log(url);
  return mongoose.connect(url, options);
};

module.exports = init;
