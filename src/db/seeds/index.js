const offerModel = require("../../models/offers");
const userModel = require("../../models/users");
const c = require("../../config")();
const { sign } = require("../../utils/jwt");

const createUser = async () => {
  const body = {
    name: "alou",
    verified: true,
    email: "pedro@oprdepr.com",
    CPF: "905.147.470-99",
    password: {
      hash:
        "41c3ff0d5d32f379d4c7e06292f0a115731bd93f37f0c83e3f7521eb5b99e6ba0fbe9acc036a8e5a9e8daa88e1dbd40c09327f2c1d6882599213b3591aa55245",
      salt: "32468f538c7ed3c4c9bbbebc637a1a88",
    },
    createdAt: Date.now(),
    institution:"UFRJ",
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

const seedOffers = (user_id) => {
  return [
    {
      title: "Estágio Eletronuclear",
      type: "estagio",
      valid: true,
      requirements:
        "Estar cursando Engenharia de Produção; - Alunos a partir do 6o período (com previsão de formatura a partir de 07/2022) e com CR > 6,5; - Inglês intermediário.",
      site: "N/A",
      tags: ["estagio", "Boladão", "500% Tunado", "Lorem"],
      description:
        'A Eletronuclear, empresa estatal responsável pela construção e operação das usinas nucleares de Angra dos Reis, está com vaga aberta para estágio na sede da empresa, no Centro do Rio. No momento as atividades ocorrem em regime de home office. A oportunidade é para trabalhar no Departamento de Planejamento e Controle de Empreendimentos. As atividades do departamento envolvem o gerenciamento e acompanhamento (progresso, orçamento e cronograma) dos empreendimentos em andamento. Interessados devem enviar CV para linaalm@eletronuclear.gov.br(Carolina Almeida), com o assunto "Vaga de Estágio 2021".',
      deadline: Date.parse("2021-05-20"),
      pay: "Remuneração de acordo com a carga horária a ser acordada.",
      beginningDate: Date.now(),
      localization: "CCS",
      neededHours: "De 20 a 30 horas semanais a ser acordada",
      contactEmail: "linaalm@eletronuclear.gov.br",
      user: user_id,
    },
    {
      title: "Vagas Pesquisa e Desenvolvimento Hilab",
      type: "estagio",
      valid: true,
      requirements: "Ser mestrando ou doutorando",
      site: "https://hilab.com.br",
      tags: ["Estágio", "Tecnologia", "Saúde"],
      description:
        "Eu sou a Isabela, e faço parte da área de Gente e Gestão da Hilab, startup de Curitiba. Em 2017, desenvolvemos um dispositivo que permite que exames de sangue sejam realizados de forma remota e os resultados cheguem ao paciente por e-mail/SMS/app em menos de 15 minutos. Nosso objetivo enquanto empresa, é humanizar e facilitar o acesso à saúde dos brasileiros.Nossas pesquisas possibilitaram lançarmos no ano passado o teste rápido para detecção do COVID - 19, inclusive. Estamos hoje com várias vagas na área de tecnologia.Essas vagas serão para a realização de pesquisa de novas tecnologias voltadas para a área da saúde. ",
      deadline: Date.parse("2021-05-20"),
      pay: "R$ 1200,00/mês",
      beginningDate: Date.parse("2021-07-01"),
      localization: "Curitiba - Remoto",
      neededHours: "30 horas semanais",
      contactEmail: "isabela.holanda@hitechnologies.com.br",
      user: user_id,
    },
    {
      title: "Estágio e Júnior - Pessoa Desenvolvedora Full-Stack",
      type: "estagio",
      valid: true,
      requirements:
        "Experiência em linguagem de programação: Ruby, Python, C#, PHP, Java ou Javascript",
      site: "https://virtual360.io/carreiras/",
      tags: ["Estágio", "Full-stack", "Ágil", "Horário Flexível"],
      description:
        "Somos uma startup do grupo Visagio, consultoria líder em desenvolvimento de pessoas no Brasil. Nosso propósito é usar tecnologia para simplificar a burocracia brasileira e facilitar a vida dos nossos clientes através de nossa uma plataforma SaaS, que automatiza o recebimento de milhares de documentos por ano. Nosso time de desenvolvimento cuida da evolução do produto, implantação da ferramenta em novos clientes e suporte à operação. Geralmente, precisamos ir além do desenvolvimento de código para evoluir o produto e resolver os problemas, contato próximo com os clientes e com os demais times internos costumam ser a chave para o sucesso.",
      deadline: Date.parse("2021-07-01"),
      pay: "R$ 2000,00 - 2500,00/mês",
      beginningDate: Date.parse("2021-08-01"),
      localization: "Remoto",
      neededHours: "30 horas semanais",
      contactEmail: "Não informado",
      user: user_id,
    },
    {
      title: "Estágio Diel Energia",
      type: "estagio",
      valid: true,
      requirements:
        "- Ensino superior, cursando ou concluído em Engenharia; - Desejável experiência nas áreas técnica ou operacional de projetos de HVAC-R; - Desejável experiência no desenvolvimento de projetos, instalação, comissionamento e manutenção; - Interesse em trabalhar em startups.",
      site: "N/A",
      tags: ["Estagio", "Energia"],
      description:
        'A Diel Energia atua com objetivo de digitalizar e simplificar a gestão de refrigeração por meio da nossa plataforma, a Devac®. Nossas ferramentas têm uma só missão: resolver problemas práticos de gestão da refrigeração, fazendo com que empresas deixem de pagar desnecessariamente por consumo de energia e manutenção excessivos.Dentre os desafios da área de sucesso do cliente, está a garantia de uma operação de sucesso e do retorno do investimento para os clientes dos 5.000 dispositivos que serão comissionados até final de 2021.Principais atividades: - Acompanhamento e planejamento de operações, junto com instaladoras e mantenedoras terceirizadas; - Triagem, instalação, comissionamento e manutenção de dispositivos DIEL; - Visitas de campo para levantamento de máquinas, ambiente e processos, para planejamento de estoque, triagem e instalação de dispositivos; - Instalação de dispositivos para PoC(Proof - of - concept / pilotos); - Análise de dados e criação de relatórios técnicos; - Utilizar a plataforma online da DIEL(Dash DEVAC) para acompanhamento de atividades de campo, atualização de firmware, planejamento de manutenções de dispositivos etc.; - Melhoria de produto baseado nas experiências de campo.Interessados devem enviar CV para o nosso email com o assunto "Vaga de Estágio 2021".',
      deadline: Date.parse("2021-05-20"),
      pay: "Bolsa auxílio",
      beginningDate: Date.now(),
      localization: "Botafogo - RJ",
      neededHours: "20 horas semanais.",
      contactEmail: "diel@dielenergia.com (Carolina Almeida)",
      user: user_id,
    },
    {
      title: "Vaga de Iniciação Científica na LABSEN",
      type: "bolsa_ic",
      valid: true,
      requirements:
        "Estar cursando Engenharia, Computação e afins; CRA maior ou igual a 6,0; • Conhecimentos de programação;",
      site: "labsen.oceanica.ufrj.br",
      tags: ["IC", "Iniciação Científica"],
      description:
        "O Laboratório de Simulação de Sistemas de Construção Naval (LABSEN) foi criado em 2006 para atender à crescente demanda por tecnologia de simulação de processos deconstrução naval e manufatura digital.Nosso objetivo é trabalhar com as mais recentestecnologias para trazer inovação neste setor.Estamos localizados no Centro detecnologia da Universidade Federal do Rio de Janeiro(UFRJ).Atualmente, estamos com uma vaga de Iniciação Científica aberta, com bolsa CNPQ,para alunos de graduação da UFRJ para participar do projeto intitulado: “Detecção de eventos em sistemas Subsea utilizando Deep Learning”.Esse projeto visa criar um novométodo para agilizar o processamento das imagens oriundas de um Veículo Submarino Autônomo(AUV).",
      deadline: Date.parse("2021-05-31"),
      pay: "R$ 400,00/mês",
      beginningDate: Date.now(),
      localization: "CT",
      neededHours: "20 horas semanais",
      contactEmail: "labsen.oceanica.ufrj.br",
      user: user_id,
    },
    {
      title: "Guthib",
      type: "estagio",
      valid: true,
      requirements: "Não tem",
      site: "www.guthib.com",
      tags: ["estagio", "frontend"],
      description:
        "O Guthib é um site criado com o intuito de demonstrar aos usuários do github que eles acessaram no site incorreto. O intuito da vaga é encontrar desenvolvedores frontend para que possam embelezar nosso site e tornar este melhor visualizavel ao usuário. Nós temos o costume de utilizar as tecnologias React, Node.js e Next.js, além disso, é interessante que o ofertante tenha conhecimentos de CI / CD no gitlab e também saiba como utilizar docker. Não é necessária experiência prévia, porém é um atrativo.",
      deadline: Date.parse("2021-05-30"),
      pay: "R$ 2000,00/mês",
      beginningDate: Date.now(),
      localization: "Estados Unidos",
      neededHours: "30 horas semanais",
      contactEmail: "opportunities@guthib.com",
      user: user_id,
    },
    {
      title: "UFRJ Analytica",
      type: "competicao",
      valid: false,
      requirements: "Ser aluno da UFRJ e ter interesse pela área de Dados.",
      site: "www.ufrjanalytica.com.br",
      tags: ["competicao", "datascience"],
      description:
        "Venha aprender muito com ciência de dados e tudo que há em torno da área de Big Data.",
      deadline: Date.parse("2021-07-07"),
      pay: "Voluntário",
      beginningDate: Date.parse("2021-07-07"),
      localization: "CT-UFRJ",
      neededHours: "20 horas semanais",
      contactEmail: "analytica@poli.ufrj.br",
      user: user_id,
    },
    {
      title: "Oportunidade Miceli Company",
      type: "estagio",
      valid: true,
      requirements:
        "Conhecimento em React.js, Node.js, Nomadismo Digital, Minoxidil 3%, IOT",
      site: "www.ufr.br",
      tags: ["estagio", "react"],
      description:
        "A Miceli Company está contratando estagiários na área de TI, não perca esta oportunidade. ",
      deadline: Date.parse("2021-05-30"),
      pay: "Voluntário",
      beginningDate: Date.now(),
      localization: "Leblon - RJ",
      neededHours: "20 horas semanais",
      contactEmail: "mi.celicomp@ny.com",
      user: user_id,
    },
    {
      title: "Emprego de Engenheiro Devops",
      type: "emprego",
      valid: true,
      requirements:
        "Graduação completa;- Sólidos conhecimentos em programação;- Experiência em desenvolvimento de aplicações web;- Ter boa comunicação e compromisso com prazos e metas;- São diferenciais: Desenvolvimento e consumo de APIs; Nuvem(AWS, Azure ou Google);Docker e Kubernetes; Automação de processos; Testes de software; Ferramentas demonitoramento.",
      site: "www.petrec.com.br",
      tags: ["emprego", "devops", "cloud"],
      description:
        "O profissional irá colaborar com planejamento e execução de tarefas relacionadas à entrega e sustentação de aplicações web. Benefícios incluem vale alimentação e plano de saúde. Carga horária de 40 horas. As principais atribuições são contribuir no propor, planejar e executartarefas relacionadas a:- Automatização dos processos de integração e entrega de software- Monitoramento de infraestrutura e sistemas;- Gerência, configuração e manutenção de Servidores Linux;- Gerência, configuração, manutenção de infraestrutura de nuvem;- Gerência, configuração e manutenção de infraestrutura escalável baseada em contêineres;- Gerência de acesso e da segurança das informações; Gerência de bancos de dados relacionais;- Tratamento de Incidentes; - Análise de desempenho de sistemas.",
      deadline: Date.parse("2021-07-07"),
      pay: "R$ 3000,00/mês",
      beginningDate: Date.now(),
      localization: "Barra da Tijuca",
      neededHours: "40 horas semanais",
      contactEmail: "vagas@petrec.com.br",
      user: user_id,
    },
    {
      title:
        "Curso Ficha Única de Notificação Compulsória de Maus-Tratos e Outras Violências",
      type: "extensao",
      valid: true,
      requirements: "N/A",
      site: "N/A",
      tags: ["Extensão", "Maus-tratos", "Violências"],
      description:
        "SELEÇÃO DE EXTENSIONISTAS O projeto de extensão  Curso Ficha Única de Notificação Compulsória de Maus - Tratos e Outras Violências(Ficha SINAN / MS), promovido pelo CRM - SSA / NEPP - DH, está selecionando extensionistas para participar de suas atividades em 2021. Inicialmente estão sendo oferecidas 02 vagas(não remuneradas)  para estudantes  da UFRJ, em especial dos cursos de graduação em Saúde Coletiva e Comunicação Social. O objetivo do curso de extensão é sensibilizar e instrumentalizar os profissionais de saúde e de outras áreas para reconhecerem casos suspeitos ou confirmados de violência contra a mulher a partir do preenchimento da ficha individual / autoprovocada do SINAN(MS), com vistas a elaborar diagnósticos situacionais que permitam propor políticas públicas intersetoriais destinadas às mulheres em situação de violência.",
      deadline: Date.parse("2021-06-30"),
      pay: "Voluntário",
      beginningDate: Date.parse("2021-08-31"),
      localization: "CT",
      neededHours: "N / A",
      contactEmail: "crmssa.ufrj@gmail.com",
      user: user_id,
    },
  ];
};

let user = {};

const promise = async () => {
  return new Promise(async (resolve, reject) => {
    if (c.isProduction() || process.env.NODE_ENV === "test") resolve();
    else {
      userModel
        .findOne({})
        .exec()
        .then(async (user) => {
          if (user === null) {
            user = await createUser();
            const user_id = user._doc._id;
            offerModel.insertMany(seedOffers(user_id));
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

//const promise =
module.exports = promise;
