const checkProp = require("./utils");

function validateUser(user, validator, required = true) {
  const err = [];
  const ch = checkProp(user, err);
  ch(
    "name",
    (s) => validator.isAlpha(s, "pt-BR", { ignore: " -" }),
    required,
    "Nome é inválido"
  );
  ch("email", validator.isEmail, required, "Email é inválido");
  ch("password", (s) => true, required, "A senha é obrigatória");
  ch("CPF", validator.cpfValidator, required, "CPF inválido");
  ch("college", (s) => true, required, "A faculdade é obrigatória");
  if (err.length > 0) {
    const error = err.reduce((acc, s) => acc + s, "");
    throw error;
  }
  return true;
}

module.exports = validateUser;
