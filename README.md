# Pega A Visão
<a href="https://codeclimate.com/github/CorchoForce/pav-back/maintainability"><img src="https://api.codeclimate.com/v1/badges/9737d22fb78cd9355932/maintainability" /></a>

![demonstration](https://cdn.discordapp.com/attachments/539836343094870016/843711267016409098/2021-05-16_21-36-26_online-video-cutter.com.gif)

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

It is well established among students at the Federal University of Rio de Janeiro (UFRJ) that internship, scientific initiation and extension opportunities offered are not well publicized. Between papers taped to the countless murals in the corridors of campuses, which may well date back to years, and emails that get lost in the inbox amidst many opportunities, a student who is looking for an opportunity of the type feels lost and helpless by the University.

Recruiters are also hampered by this confusing process. Often, they depend on the goodwill of teachers to forward their vacancies to students of the desired profile, or else they end up in the inbox of students of courses that are totally outside the scope of the proposed vacancy. A system that helps them will be of great value to the company, laboratory or project in which they work.

Thus, the need for a system that aggregates internship opportunities, scientific initiation and extension for university students by the members of CorchoForce was identified. The project was carried out within the scope of the Advanced Programming discipline (EEL418), from the Polytechnic School of UFRJ, and guided by Professor Cláudio Miceli de Farias, from the Program for Systems and Computer Engineering at COPPE/UFRJ.

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
 MONGO_DB=pav #Mongo database
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
