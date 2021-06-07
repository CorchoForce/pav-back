const nodemailer = require("nodemailer");
const jwt = require("../utils/jwt");

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env["EMAIL_KEY"],
        pass: process.env["EMAIL_PASSWORD"]
    },
    from: process.env["EMAIL_KEY"] + "@" + process.env["EMAIL_DOMAIN"],
});

const sendEmail = (res, user) => {
    if(process.env.NODE_ENV ==="test"){
        res.status(200).json({ message: "Email enviado" });
        return;
    }

    const token = jwt.sign(user, '1h');

    link = process.env['FRONT_URL'] + "/verify_email?token=" + token;
    mailOptions = {
        to: user.email,
        subject: "Bem vindo ao Pega a Visão. Por favor confirme seu email",
        html: `<!DOCTYPE html>
                <html lang="pt-BR" style="height: 100%; position: relative;">

                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>Pega a Visão</title>
                </head>

                <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"
                    class="kt-woo-wrap order-items-normal k-responsive-normal title-style-below email-id-customer_new_account"
                    style="height: 100%; position: relative; background-color: #fff7f7; margin: 0; padding: 0;">
                    <div id="wrapper" dir="ltr"
                        style="background-color: #F6F0E7; margin: 0; padding: 70px 0 70px 0; width: 100%; padding-top: 0px; padding-bottom: 0px; -webkit-text-size-adjust: none;">
                        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                            <tr>
                                <td align="center" valign="top">
                                    <table id="template_header_image_container" style="width: 100%; background-color: #dfd9d1;">
                                        <tr id="template_header_image">
                                            <td align="center" valign="middle">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    id="template_header_image_table">
                                                    <tr>
                                                        <td align="center" valign="middle"
                                                            style="text-align: center; padding-top: 25px; padding-bottom: 25px;">
                                                            <p style="margin-bottom: 0; margin-top: 0;">
                                                                <a href="https://pav-front-stage.herokuapp.com" target="_blank"
                                                                    style="font-weight: normal; color: #0B5471; display: block; text-decoration: none;">
                                                                    <img src="https://cdn.discordapp.com/attachments/539836343094870016/851139325483155476/navbar_logo.png"
                                                                        alt="Símbolo do Pega a Visão" width="160"
                                                                        style="border: none; display: inline; font-weight: bold; height: auto; outline: none; text-decoration: none; text-transform: capitalize; font-size: 14px; line-height: 24px; width: 100%; max-width: 160px;">
                                                                </a>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_container"
                                        style="background-color: #ffffff; overflow: hidden; border-style: solid; border-right-width: px; border-bottom-width: px; border-left-width: px; border-color: #ffffff; border-radius: 0px; border-width: 0px solid #fff7f7; box-shadow: 0 0px 0px 0px rgba(0,0,0,0.1);">
                                        <tr>
                                            <td align="center" valign="top">
                                                <!-- Header -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_header"
                                                    style='border-bottom: 0; font-weight: bold; line-height: 100%; vertical-align: middle; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; background-color: #141833; color: #ffffff;'>
                                                    <tr>
                                                        <td id="header_wrapper"
                                                            style="padding: 36px 48px; display: block; text-align: justify; padding-top: 48px; padding-bottom: 48px; padding-left: 48px; padding-right: 48px;">
                                                            <div class="subtitle"
                                                                style="font-size: 20px; line-height: 34px; font-family: Georgia, serif; font-style: italic; font-weight: 400; color: #ffffff;">
                                                                Olá!</div>
                                                            <h1
                                                                style='margin: 0; text-align: justify; font-size: 32px; line-height: 40px; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-style: normal; font-weight: 600; color: #ffffff;'>
                                                                Boas vindas ao Pega a Visão!</h1>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <!-- End Header -->
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top">
                                                <!-- Body -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_body">
                                                    <tr>
                                                        <td valign="top" id="body_content"
                                                            style="background-color: #ffffff; padding-top: 0px; padding-bottom: 10px;">
                                                            <!-- Content -->
                                                            <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                                <tr>
                                                                    <td valign="top"
                                                                        style="padding: 0px 48px 0; padding-left: 48px; padding-right: 48px;">
                                                                        <div id="body_content_inner"
                                                                            style='color: #333333; text-align: left; font-size: 14px; line-height: 24px; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-weight: 400;'>
                                                                            <div align="justify">
                                                                                <font color="#ffffff">-</font>
                                                                                <p style="margin: 0 0 16px;">Para que sua conta seja criada com sucesso, precisamos que você confirme seu email.</p>
                                                                                <p style="margin: 0 0 16px;"> </p>
                                                                                <p style="margin: 0 0 16px;">Para isso, basta clicar no link abaixo: </p>
                                                                                <a href=`+ link + ` rel="nofollow">Clique Aqui</a>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <!-- End Content -->
                                                        </td>
                                                    </tr>
                                                </table>
                                                <!-- End Body -->
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    id="template_footer_container" style="background-color: #141833;">
                                                    <tr>
                                                        <td valign="top" align="center">
                                                            <table border="0" cellpadding="10" cellspacing="0" width="600"
                                                                id="template_footer">
                                                                <tr>
                                                                    <td valign="top" id="template_footer_inside"
                                                                        style="padding: 0; padding-top: 25px; padding-bottom: 25px; padding-left: 48px; padding-right: 48px;">
                                                                        <table border="0" cellpadding="10" cellspacing="0" width="100%">
                                                                            <tr>
                                                                                <td valign="top" style="padding: 0;">
                                                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                                                        width="100%">
                                                                                        <tr>
                                                                                            <td colspan="2" valign="middle" id="credit"
                                                                                                style='padding: 0; border: 0; line-height: 125%; padding-left: 0px; padding-right: 0px; text-align: center; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-weight: 400; color: #f7f7f7; padding-top: 30px; padding-bottom: 0px;'>
                                                                                                <a href="https://www.github.com/CorchoForce"style="color: #f7f7f7;">Equipe
                                                                                                    CorchoForce
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table class="gmail-app-fix" width="100%" border="0" cellpadding="0" cellspacing="0"
                                                    style="background-color: #141833;">
                                                    <tr>
                                                        <td>
                                                            <table cellpadding="0" cellspacing="0" border="0" align="center"
                                                                width="600">
                                                                <tr>
                                                                    <td cellpadding="0" cellspacing="0" border="0" height="1"
                                                                        style="line-height: 1px; min-width: 200px;"></td>
                                                                    <td cellpadding="0" cellspacing="0" border="0" height="1"
                                                                        style="line-height: 1px; min-width: 200px;"></td>
                                                                    <td cellpadding="0" cellspacing="0" border="0" height="1"
                                                                        style="line-height: 1px; min-width: 200px;"></td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- End template container -->
                                </td>
                            </tr>
                        </table>
                    </div>
                </body>
                </html>`
    }
    smtpTransport.sendMail(mailOptions, (error) => {
        if (error) {
            res.status(418).json({message: "Erro inesperado ao enviar o email de confirmação."})        
        } else {
            res.status(200).json({ message: "Email enviado" });
        }
    });
}

module.exports = sendEmail;
