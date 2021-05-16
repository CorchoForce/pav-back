const offerModel = require("../../models/offers");
const c = require("../../config")();

const seedOffers = [
  {
    title: "Estágio xinforinfole",
    type: "Estágio",
    requirements: "Ciclo Básico completo",
    site: "www.guthib.com",
    tags: ["Estágio", "Boladão", "500% Tunado", "Lorem"],
    description: "Nullam sit amet molestie ligula. Aenean viverra nec lacus quis finibus. Etiam a cursus orci. Curabitur volutpat dolor tempus pellentesque euismod. Donec rhoncus, lectus vel scelerisque accumsan, odio ante vulputate justo, et congue libero sem ac ipsum. Phasellus at vulputate urna. Morbi vestibulum placerat lorem sed lobortis. Nam ac erat ut massa convallis interdum. Donec enim eros, pulvinar quis molestie ac, posuere vel ipsum. Cras eget massa pellentesque, ultrices turpis in, eleifend tellus. Nunc malesuada eros enim. Integer auctor tincidunt ligula, in porta sem malesuada non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ",
    deadline: Date.now(),
    pay: 1400,
    beginningDate: Date.now(),
    localization: "CCS",
    neededHours: 8,
    user: {
      description: "Lorem ipsum dolor sit amet",
      email: "pepedelepepe@loremipsum.com",
    },
  },
  {
    title: "Estágio xinforinfola",
    type: "Estágio",
    requirements: "Ciclo Básico completo",
    site: "www.guthib.com",
    tags: ["Estágio", "Boladão", "500% Tunado", "Lorem"],
    description: "Ut quis tortor nibh. Sed eget fermentum velit. Donec tempor hendrerit ligula ac euismod. Nullam elementum et neque eget vehicula. Cras ac commodo eros. Morbi sagittis eros egestas elit auctor vehicula. Pellentesque elementum ligula quis diam semper commodo. Vivamus quis turpis vitae mi dignissim egestas faucibus sed eros. Quisque porta magna et libero imperdiet, nec vestibulum nunc imperdiet. In in arcu nec elit hendrerit sollicitudin. Vivamus molestie erat vel odio cursus, quis cursus nibh consequat. ",
    deadline: Date.now(),
    pay: 1400,
    beginningDate: Date.now(),
    localization: "CCS",
    neededHours: 8,
    user: {
      description: "Lorem ipsum dolor sit amet",
      email: "pepedelepepe@loremipsum.com",
    },
  },
  {
    title: "Estágio do ano",
    type: "Estágio",
    requirements: "Ciclo Básico completo",
    site: "www.guthib.com",
    tags: ["Estágio", "Boladão", "500% Tunado", "Lorem"],
    description: "Curabitur et ipsum dolor. Integer dolor quam, tristique quis finibus non, mollis non orci. Aenean finibus a orci placerat placerat. Suspendisse potenti. Vestibulum ante dolor, dapibus ut tristique ac, aliquet non magna. Nulla justo nulla, scelerisque quis sem sed, maximus malesuada nunc. Proin pellentesque libero nec lectus mollis tristique. Sed tincidunt eu mi vel aliquet. Integer velit lacus, tincidunt eu vehicula a, consectetur vel lectus. Aenean lobortis auctor ex quis blandit. Nullam a lacinia enim. Donec in varius quam. Phasellus aliquam odio nulla, sagittis tempus metus pellentesque ac.",
    deadline: Date.now(),
    pay: 1400,
    beginningDate: Date.now(),
    localization: "CCS",
    neededHours: 8,
    user: {
      description: "Lorem ipsum dolor sit amet",
      email: "pepedelepepe@loremipsum.com",
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
    title: "Estágio boladão 4",
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
    title: "Bolsa IC PESC 6",
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
    title: "Estágio boladão 8",
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
    title: "Bolsa IC PESC 99",
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
    title: "Estágio boladão 2123",
    type: "Estágio",
    requirements: "Ciclo Básico completo",
    site: "www.ufr.br",
    tags: ["Estágio", "Boladão"],
    description: "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,",
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
    title: "Bolsa IC PESC 2123",
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
    title: "Estágio boladão 355",
    type: "Estágio",
    requirements: "Ciclo Básico completo",
    site: "www.ufr.br",
    tags: ["Estágio", "Boladão"],
    description: "Vivamus ultricies quis orci ut sodales. Quisque maximus quis diam eget lobortis. Sed rutrum porttitor urna, at pulvinar orci accumsan eget. Donec congue elit tellus, varius tincidunt nisi laoreet at. Aliquam ut auctor lorem. Proin arcu nisl, dapibus ut finibus semper, dignissim quis massa. Donec pellentesque dignissim ligula et placerat. ",
    deadline: Date.now(),
    pay: 300,
    beginningDate: Date.now(),
    localization: "CT",
    neededHours: 8,
    user: {
      description: "Empresa Boladona",
      email: "boladona@boladona.com",
    },
  },
  {
    title: "Bolsa IC PESC 55545",
    type: "Bolsa IC",
    requirements: "Ciclo Básico completo",
    site: "www.ufr.br",
    tags: ["IC", "Boladão"],
    description: "Vivamus ultricies quis orci ut sodales. Quisque maximus quis diam eget lobortis. Sed rutrum porttitor urna, at pulvinar orci accumsan eget. Donec congue elit tellus, varius tincidunt nisi laoreet at. Aliquam ut auctor lorem. Proin arcu nisl, dapibus ut finibus semper, dignissim quis massa. Donec pellentesque dignissim ligula et placerat. Maecenas a arcu neque. Nam euismod erat odio, quis ullamcorper justo sagittis ac. Fusce in aliquet neque. Duis massa mi, efficitur quis faucibus sed, molestie eu mi. Morbi condimentum, nulla et rutrum dapibus, libero elit aliquam lorem, at molestie metus velit non lectus. Nunc in dolor eros. Aenean at luctus dui. Integer eleifend risus tellus, vitae consequat est gravida sit amet. Quisque laoreet suscipit erat vel consequat. ",
    deadline: Date.now(),
    pay: 4000,
    beginningDate: Date.now(),
    localization: "CT",
    neededHours: 8,
    user: {
      description: "PESC",
      email: "popegadelepega@quadratico.ufrj.br",
    },
  },
];

const promise = new Promise((resolve, rejcet) => {
  if (c.isProduction()) resolve();
  else {
    offerModel
      .findOne({})
      .exec()
      .then((offers) => {
        if (offers === null) {
          offerModel.insertMany(seedOffers);
        }
        resolve();
      })
      .catch((err) => {
        rejcet(err);
      });
  }
});

//const promise =
module.exports = promise;
