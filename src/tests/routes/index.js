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
  it("it should register a user", (done) => {
    const body = {
      name: "Rodrigo",
      email: "rpalmeira1999@poli.ufrj.br",
      CPF: "85519502587",
      password: "123mudar",
    };

    chai
      .request(server)
      .post("/register")
      .send(body)
      .end((err, res) => {
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
        console.log(decoded);
        done();
      });
  });
});
