const offerModel = require("../../models/offers");
const seedOffers = [
  {
    title: "Estágio boladão",
    type: "Estágio",
    requirements: "Ciclo Básico completo",
    site: "www.ufr.br",
    tags: ["Estágio", "Boladão"],
    description: "Venha trabalhar com a gente e ser feliz",
    deadline: Date.now(),
    pay: 30000,
    beginningDate: Date.now(),
    localization: "CT",
    neededHours: 8,
    user: {
      description: "Empresa Boladona",
      email: "boladona@boladona.com",
    },
  },
  {
    title: "Bolsa IC PESC",
    type: "Bolsa IC",
    requirements: "Ciclo Básico completo",
    site: "www.ufr.br",
    tags: ["IC", "Boladão"],
    description: "Venha trabalhar com a gente e ser feliz",
    deadline: Date.now(),
    pay: 4000,
    beginningDate: Date.now(),
    localization: "CT",
    neededHours: 8,
    user: {
      description: "PESC",
      email: "email@cos.ufrj.br",
    },
  },
  {
    title: "Estágio boladão 2",
    type: "Estágio",
    requirements: "Ciclo Básico completo",
    site: "www.ufr.br",
    tags: ["Estágio", "Boladão"],
    description: "Venha trabalhar com a gente e ser feliz",
    deadline: Date.now(),
    pay: 30000,
    beginningDate: Date.now(),
    localization: "CT",
    neededHours: 8,
    user: {
      description: "Empresa Boladona",
      email: "boladona@boladona.com",
    },
  },
  {
    title: "Bolsa IC PESC 2",
    type: "Bolsa IC",
    requirements: "Ciclo Básico completo",
    site: "www.ufr.br",
    tags: ["IC", "Boladão"],
    description: "Venha trabalhar com a gente e ser feliz",
    deadline: Date.now(),
    pay: 4000,
    beginningDate: Date.now(),
    localization: "CT",
    neededHours: 8,
    user: {
      description: "PESC",
      email: "email@cos.ufrj.br",
    },
  },
  {
    title: "Estágio boladão 3",
    type: "Estágio",
    requirements: "Ciclo Básico completo",
    site: "www.ufr.br",
    tags: ["Estágio", "Boladão"],
    description: "Venha trabalhar com a gente e ser feliz",
    deadline: Date.now(),
    pay: 30000,
    beginningDate: Date.now(),
    localization: "CT",
    neededHours: 8,
    user: {
      description: "Empresa Boladona",
      email: "boladona@boladona.com",
    },
  },
  {
    title: "Bolsa IC PESC 3",
    type: "Bolsa IC",
    requirements: "Ciclo Básico completo",
    site: "www.ufr.br",
    tags: ["IC", "Boladão"],
    description: "Venha trabalhar com a gente e ser feliz",
    deadline: Date.now(),
    pay: 4000,
    beginningDate: Date.now(),
    localization: "CT",
    neededHours: 8,
    user: {
      description: "PESC",
      email: "email@cos.ufrj.br",
    },
  },
];

const promise = new Promise((resolve, rejcet) => {
  offerModel
    .findOne({})
    .exec()
    .then((offers) => {
      if (offers === null) {
        return offerModel.insertMany(seedOffers);
      } else {
        resolve();
        return;
      }
    })
    .catch((err) => {
      rejcet(err);
    });
});

//const promise =
module.exports = promise;
