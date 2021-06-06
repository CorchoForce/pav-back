const checkProp = (obj, err) => {
  return (prop, f, required, errMessage) => {
    const b = (obj.hasOwnProperty(prop) || !required) && f(obj[prop]);
    if (!b) {
      err.push(errMessage + "\n");
    }
  };
};

module.exports = checkProp;
