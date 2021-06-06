process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { server, end } = require("../../app");
const should = chai.should();
const dbMem = require("../../db/memory");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");

chai.use(chaiHttp);

before(async () => {
  await end;
  await dbMem.clearDatabase();
  return;
});

after(async () => {
  dbMem.closeDatabase();
  return end.then((val) => val.close());
});

describe("Autentication ", () => {
  const body = {
    name: "Rodrigo",
    email: "pedro@poli.ufrj.br",
    CPF: "905.147.470-99",
    password: "123mudar",
  };

  it("it should register a user", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(body)
      .end((err, res) => {
        res.should.have.status(201);
        const decoded = jwt.verify(res.body.token, process.env.APP_KEY);
        Object.keys(body).forEach((val) => {
          if (val != "password") {
            decoded.should.have.property(val);
            res.body.user.should.have.property(val);
            expect(body.val).to.equal(res.body.val);
            expect(body.val).to.equal(decoded.val);
          }
        });
        should.not.exist(decoded.password);
        should.not.exist(res.body.password);
        done();
      });
  });

  it("it should repond a 422 error", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(body)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.message.should.be.eql("Email ou CPF já registrado");
        done();
      });
  });

  it("it should login a user", (done) => {
    chai
      .request(server)
      .post("/login")
      .send(body)
      .end((err, res) => {
        res.should.have.status(200);
        const decoded = jwt.verify(res.body.token, process.env.APP_KEY);
        Object.keys(body).forEach((val) => {
          if (val != "password") {
            decoded.should.have.property(val);
            res.body.user.should.have.property(val);
            expect(body.val).to.equal(res.body.val);
            expect(body.val).to.equal(decoded.val);
          }
        });
        should.not.exist(decoded.password);
        should.not.exist(res.body.password);
        done();
      });
  });

  it("it should fail to login a user(incorrect password)", (done) => {
    chai
      .request(server)
      .post("/login")
      .send({ ...body, password: "123" })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.message.should.be.eql("Senha incorreta");
        done();
      });
  });

  it("it should fail to login a user(email isn't registered)", (done) => {
    chai
      .request(server)
      .post("/login")
      .send({ ...body, email: "other@other.org" })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.message.should.be.eql("Email não cadastrado");
        done();
      });
  });
});
