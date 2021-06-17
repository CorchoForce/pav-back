process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { server, end } = require("../../app");
const should = chai.should();
const dbMem = require("../../db/memory");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");
const { sign } = require("../../utils/jwt");
const userModel = require("../../models/users");

chai.use(chaiHttp);

let user = {}
let user2 = {}

after(async () => {
  dbMem.closeDatabase();
  return end.then((val) => val.close());
});

const body = {
  name: "Rodrigo",
  email: "pedro@poli.ufrj.br",
  CPF: "905.147.470-99",
  password: "teste",
  createdAt: Date.now(),
  college: "UFRJ",
  verified: false,
};

const body2 = {
  name: "Bruno",
  email: "bruno@poli.ufrj.br",
  CPF: "392.557.990-70",
  password: {
    hash: 'b2b6a994510f3c1a0f40b69cb7bf4f9aa52f0ba07894ea0a27e6f5c262bec507fc4b272722d75374be04a021f553572f07b9c44df4fdcf0d1ceb09792a978f2b',
    salt: '549747ddb35175ae3f603ed7b4ce1e08', },
  createdAt: Date.now(),
  college: "UFRJ",
  verified: false,
}

const body3 = {
  name: "BDANTAS",
  email: "obrabo@poli.ufrj.br",
  CPF: "252.410.200-98",
  password: {
    hash: 'b2b6a994510f3c1a0f40b69cb7bf4f9aa52f0ba07894ea0a27e6f5c262bec507fc4b272722d75374be04a021f553572f07b9c44df4fdcf0d1ceb09792a978f2b',
    salt: '549747ddb35175ae3f603ed7b4ce1e08',
  },
  createdAt: Date.now(),
  college: "UFRJ",
  verified: true,
}

const createUser = (param) => {
  return new userModel(param)
  .save()
  .then((user) => {
    return { ...user, token: sign(user) };
  })
  .catch((err) => {
    throw err;
  });
}

describe("Autentication ", () => {

  before(async () => {
    await end;
    await dbMem.clearDatabase();
    user = await createUser(body2);
    user2 = await createUser(body3);    
    return;
  });

  it("it should register a user", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(body)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.message.should.be.eql("Email enviado");
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

  it("it should verify a user", (done) => {
    chai
      .request(server)
      .post("/mail/verify")
      .set("Authorization", "Bearer " + user.token)
      .send({})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eql("Usuário verificado.");
        done();
      });
  });

  it("it should fail to login a user(user not verified)", (done) => {
    chai
      .request(server)
      .post("/login")
      .send(body)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.be.eql("Usuário não verificado");
        done();
      });
  });

  it("it should fail to verify a user(already verified)", (done) => {
    chai
      .request(server)
      .post("/mail/verify")
      .set("Authorization", "Bearer " + user.token)
      .send({})
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.message.should.be.eql("Usuário já verificado");
        done();
      });
  });

  it("it should login a user", (done) => {
    chai
      .request(server)
      .post("/login")
      .send({ email:"obrabo@poli.ufrj.br", password:"teste"})
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
      .send({ email:"obrabo@poli.ufrj.br", password: "123" })
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
