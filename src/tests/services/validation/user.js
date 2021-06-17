process.env.NODE_ENV = "test";
const chai = require("chai");
const validateUser = require("../../../services/validation/user");
const validator = require("validator");

describe("Regras de Validação Usuário ", () => {
  const body = {
    name: "Rodrigo Mendes",
    email: "rpalmeira1999@poli.ufrj.br",
    CPF: "905.147.470-99",
    password: "123mudar",
    createdAt: Date.now(),
    college: "UFRJ",
  };
  it("Deve Validar o Usuário", (done) => {
    validateUser(body, { ...validator, cpfValidator: () => true });
    done();
  });
  const body2 = {
    name: "Rodrigo Mendes56",
    email: "rpalmeira1999@poli.ufrj.br",
    CPF: "905.147.470-99",
    password: "123mudar",
    createdAt: Date.now(),
    college: "UFRJ",
  };
  it("Deve Recusar o Usuário pelo nome", (done) => {
    try {
      validateUser(body2, { ...validator, cpfValidator: () => true });
    } catch (e) {
      e.should.be.eql("Nome é inválido\n");
    }
    done();
  });
  const body3 = {
    name: "Rodrigo Mendes",
    email: "rpalmeira1999",
    CPF: "905.147.470-99",
    password: "123mudar",
    createdAt: Date.now(),
    college: "UFRJ",
  };
  it("Deve Recusar o Usuário pelo email", (done) => {
    try {
      validateUser(body3, { ...validator, cpfValidator: () => true });
    } catch (e) {
      e.should.be.eql("Email é inválido\n");
    }
    done();
  });
  const body4 = {
    name: "Rodrigo Mendes",
    email: "meira1999@poli.ufrj.br",
    CPF: "905.147.470-99",
    password: "123mudar",
    createdAt: Date.now(),
    college: "UFRJ",
  };
  it("Deve Recusar o Usuário pelo CPF", (done) => {
    try {
      validateUser(body4, { ...validator, cpfValidator: () => false });
    } catch (e) {
      e.should.be.eql("CPF inválido\n");
    }
    done();
  });
  const body5 = {
    name: "Rodrigo Mendes213",
    email: "meira",
    CPF: "905.147.470-99",
    createdAt: Date.now(),
  };
  it("Deve Recusar o Usuário por tudo", (done) => {
    try {
      validateUser(body5, { ...validator, cpfValidator: () => false });
    } catch (e) {
      e.should.be.eql(
        "Nome é inválido\nEmail é inválido\nA senha é obrigatória\nCPF inválido\nA faculdade é obrigatória\n"
      );
    }
    done();
  });
});
