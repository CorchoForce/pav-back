process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const offerModel = require("../../models/offers");
const userModel = require("../../models/users");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const { server, end } = require("../../app");
const should = chai.should();
const dbMem = require("../../db/memory");
const { sign } = require("../../utils/jwt");

let user = {};

chai.use(chaiHttp);
before(async () => {
  await end;
  await dbMem.clearDatabase();
  user = await createUser();
  return;
});

after(async () => {
  dbMem.closeDatabase();
  return end.then((val) => val.close());
});

const createUser = async () => {
  const body = {
    name: "Rodrigoasd",
    email: "pedro34@poli.ufrj.br",
    CPF: "056.947.110-92",
    password: { hash: "aaaa", salt: "queblz" },
  };

  return new userModel(body)
    .save()
    .then((user) => {
      return { ...user, token: sign(user) };
    })
    .catch((err) => {
      throw err;
    });
};

const body = () => {
  return {
    title: "Estágio boladão 356",
    type: "Estágio",
    requirements: "Ciclo Básico completo",
    valid: true,
    site: "www.ufr.br",
    tags: ["Estágio", "Boladão"],
    description:
      "Vivamus ultricies quis orci ut sodales. Quisque maximus quis diam eget lobortis. Sed rutrum porttitor urna, at pulvinar orci accumsan eget. Donec congue elit tellus, varius tincidunt nisi laoreet at. Aliquam ut auctor lorem. Proin arcu nisl, dapibus ut finibus semper, dignissim quis massa. Donec pellentesque dignissim ligula et placerat. ",
    deadline: Date.parse("2100-01-01"),
    pay: 300,
    beginningDate: Date.now(),
    localization: "CT",
    neededHours: 8,
    contactEmail: "email@email.com",
    user: user._doc._id,
  };
};

describe("Offers", () => {
  describe("/GET offer", () => {
    it("it should GET no offer", (done) => {
      chai
        .request(server)
        .get("/offer")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
    it("it should GET a list with created offer", (done) => {
      const createdOffer = new offerModel(body());
      createdOffer.save((err, offer) => {
        chai
          .request(server)
          .get("/offer/")
          .end((err, res) => {
            res.body[0].should.be.a("object");
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(1);
            Object.keys(body).forEach((val) => {
              res.body[0].should.have.property(val);
            });
            done();
          });
      });
    });
  });

  describe("/POST offer", () => {
    it("it should create a offer with all correct keys", (done) => {
      chai
        .request(server)
        .post("/offer")
        .set("Authorization", "Bearer " + user.token)
        .send(body())
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          Object.keys(body()).forEach((val) => {
            res.body.should.have.property(val);
          });
          done();
        });
    });
  });

  describe("/GET/:id offer", () => {
    it("it should GET a offer by the given id", (done) => {
      const createdOffer = new offerModel(body());
      createdOffer.save((err, offer) => {
        chai
          .request(server)
          .get("/offer/" + offer.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            Object.keys(body).forEach((val) => {
              res.body.should.have.property(val);
            });
            res.body.should.have.property("_id").eql(createdOffer.id);
            done();
          });
      });
    });
  });
  describe("/PUT/:id offer", () => {
    it("it should UPDATE a offer given the id", (done) => {
      const createdOffer = new offerModel(body(user._id));
      const change = { title: "Estágio Super boladão" };
      createdOffer.save((err, offer) => {
        chai
          .request(server)
          .put("/offer/" + offer.id)
          .set("Authorization", "Bearer " + user.token)
          .send(change)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            Object.keys({ ...body, ...change }).forEach((val) => {
              res.body.should.have.property(val);
            });
            done();
          });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id offer", () => {
    it("it should DELETE a offer given the id", (done) => {
      const createdOffer = new offerModel(body(user._id));
      createdOffer.save((err, offer) => {
        chai
          .request(server)
          .delete("/offer/" + offer.id)
          .set("Authorization", "Bearer " + user.token)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  });
});
