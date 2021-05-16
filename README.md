# Pega A Visão

![demonstration](https://cdn.discordapp.com/attachments/836348442409828385/843572877185253425/unknown.png)

## Table of Contents

<!--ts-->

- [About](#about)
- [Requirements](#requirements)
- [How to use](#how-to-use)
  - [Setting up Frontend](#frontend-setup)
  - [Setting up Backend](#backend-setup)
- [Technologies](#technologies)
<!--te-->

## About

É bem estabelecido entre os alunos da Universidade Federal do Rio de Janeiro (UFRJ) que as vagas de estágio, iniciação científica e extensão ofertadas não são bem divulgadas. Entre papéis grampeados nos incontáveis murais nos corredores dos campi, que podem muito bem datar de anos, e e-mails que ficam perdidos na caixa de entrada em meio a diversas oportunidades, um estudante que está procurando uma oportunidade do tipo se sente perdido e desamparado pela universidade.

Os recrutadores também são prejudicados com esse processo confuso. Muitas vezes, dependem da boa vontade de professores para encaminhar suas vagas para os alunos de perfil desejado, ou então acabam na caixa de entrada de estudantes de cursos que fogem totalmente do escopo da vaga proposta. Um sistema que os ajude será de grande valor para a empresa, laboratório ou projeto em que trabalham.

Dessa forma, foi identificada a necessidade de um sistema que seja um agregador de oportunidades de estágio, iniciação científica e extensão para alunos da universidade pelos membros da CorchoForce. O projeto foi realizado dentro do escopo da disciplina de Programação Avançada (EEL418), da Escola Politécnica da UFRJ, e orientado pelo professor Cláudio Miceli de Farias, do Programa de Engenharia de Sistemas e Computação da COPPE/UFRJ. 

## Requirements

To run this repository by yourself you will need to install node.js, docker and docker-compose in your machine and them install all the projects requirements. We will show how to do it in the next step.

## How to use

### Frontend Setup

```bash
# Clone the frontend repository
$ git clone <https://github.com/CorchoForce/pav-front>

# Access the frontend directory
$ cd pav-front/

# Build the docker image
$ docker build . -t pav-front:v1.0.0

# Run the docker container the following command
$ docker run --network="host" -p 3000:3000 pav-front:v1.0.0

#Them the app will be running in the http://localhost:3000
```

![demonstration](https://cdn.discordapp.com/attachments/836348442409828385/843592891661811742/unknown.png)

### Backend Setup

```bash
# Clone the backend repository
$ git clone <https://github.com/CorchoForce/pav-back>

# Access the backend directory
$ cd pav-back/

# Create a .env file
$ touch .env

# Add the following parameters to the created .env file
 SERVER_PORT=8080 #Backend running port
 URL=localhost #Backend url
 PRODUCTION=FALSE #If it's running in production mode or not
 FRONT_URL=any #The frontend production url
 MONGO_USERNAME=root #Mongo username
 MONGO_PASSWORD=123 #Mongo password
 MONGO_PORT=27017 # Mongo port
 MONGO_DB=sharkinfo #Mongo database
 MONGO_HOSTNAME=127.0.0.1 #Mongo hostname

#Run the docker-compose file
$ docker-compose up

#The api will be running in the port 27017
```

![demonstration](https://cdn.discordapp.com/attachments/836348442409828385/843592277590802442/unknown.png)

## Technologies

- React
- Express.js
- Docker
- Heroku
