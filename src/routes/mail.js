const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env["EMAIL_KEY"],
        pass: process.env["EMAIL_PASSWORD"]
    }
});

router.get('/', (req, res) => {
    res.json({'confirmation':true});
});

router.get('/send', (req, res) => {
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + req.get('host') + "/verify?id=" + rand;
    mailOptions = {
        to: "req.query.to",
        subject: "Bem vindo ao Pega a Visão. Por favor confirme seu email",
        html: "Olá,<br> Por favor, clique no link abaixo para verificar o seu email.<br><a href=" + link + ">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

router.get('/verify', (req, res) =>{

});

module.exports = { url: "/mail", router };