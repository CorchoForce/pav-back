const nodemailer = require("nodemailer");
const jwt = require("./jwt");

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env["EMAIL_KEY"],
        pass: process.env["EMAIL_PASSWORD"]
    },
    from: process.env["EMAIL_KEY"] + "@" + process.env["EMAIL_DOMAIN"],
});

const sendPasswordEmail = (res, user) => {
    if(process.env.NODE_ENV ==="test"){
        res.status(200).json({ message: "Email enviado" });
        return;
    }

    const token = jwt.sign(user, '1h');

    link = process.env['FRONT_URL'] + "/update_password?token=" + token;
    mailOptions = {
        from: smtpTransport.from,
        to: user.email,
        subject: "[Pega A Visão] Redefinição de senha",
        text:`
            Alteração de senha
            Altere sua senha pelo link abaixo. Caso não tenha solicitado uma nova senha, por favor ignore esse e-mail.
            

            `+ link + `

            ©2021 CorchoForce`,
        html:`
            <!doctype html><html
                xmlns="http://www.w3.org/1999/xhtml"
                xmlns:v="urn:schemas-microsoft-com:vml"
                xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title>
                <!--[if !mso]>
                <!-- -->
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <!--
                    <![endif]-->
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                            <style type="text/css">
                    #outlook a {
                    padding: 0;
                    }

                    body {
                    margin: -29;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    }

                    table,
                    td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    }

                    img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                    }

                    p {
                    display: block;
                    margin: 13px 0;
                    }
                </style>
                            <!--[if mso]>
                            <xml>
                                <o:OfficeDocumentSettings>
                                    <o:AllowPNG/>
                                    <o:PixelsPerInch>96</o:PixelsPerInch>
                                </o:OfficeDocumentSettings>
                            </xml>
                            <![endif]-->
                            <!--[if lte mso 11]>
                            <style type="text/css">
                        .outlook-group-fix { width:100% !important; }
                        </style>
                            <![endif]-->
                            <!--[if !mso]>
                            <!-->
                            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
                                <style type="text/css">
                    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                </style>
                                <!--
                                <![endif]-->
                                <style type="text/css">
                    @media only screen and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                    }
                    }
                </style>
                                <style type="text/css">
                    @media only screen and (max-width:480px) {
                    table.full-width-mobile {
                        width: 100% !important;
                    }
                    td.full-width-mobile {
                        width: auto !important;
                    }
                    }
                </style>
                                <style type="text/css">
                    * {
                    text-rendering: optimizeLegibility;
                    -moz-osx-font-smoothing: grayscale;
                    font-smoothing: antialiased;
                    -webkit-font-smoothing: antialiased;
                    }

                    .type-cta {
                    user-select: none;
                    }

                    .type-nostyle {
                    text-decoration: none;
                    }

                    p {
                    margin-top: 0;
                    }
                </style>
                            </head>
                            <body style="background-color:white;">
                                <div style="background-color:white;">
                                    <!-- logo -->
                                    <!--[if mso | IE]>
                                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:520px;" width="520"
                    >
                                        <tr>
                                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                                                <![endif]-->
                                                <div style="margin:0px auto;max-width:50px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:10%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="direction:ltr;font-size:0px;padding:64px 1% 12px 10;text-align:center;">
                                                                    <!--[if mso | IE]>
                                                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td
                            class="" style="vertical-align:top;width:500px;"
                            >
                                                                                <![endif]-->
                                                                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                                                        <tr>
                                                                                            <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                                                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style="width:54px;">
                                                                                                                <a href="https://go.dekks.app/lnk/EAAAAHgdD6EAAAAAAAAAAACxE88AAAAAG0EAAAAAAA_z_wBdvEZnOKMTmiFFQUmu0YpTqga6ewAPsGQ/1/J8de0fw-ZYMytGaiYdJWOA/aHR0cHM6Ly9kZWtrcy5hcHAv" target="_blank"></a>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                                <!--[if mso | IE]>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <![endif]-->
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--[if mso | IE]>
                                            </td>
                                        </tr>
                                    </table>
                                    <![endif]-->
                                    <!-- body head -->
                                    <!--[if mso | IE]>
                                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:520px;" width="520"
                    >
                                        <tr>
                                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                                                <![endif]-->
                                                <div style="margin:0px auto;max-width:500px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="direction:ltr;font-size:0px;padding:12px 10% 4px 10%;text-align:center;">
                                                                    <!--[if mso | IE]>
                                                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td
                            class="" style="vertical-align:top;width:500px;"
                            >
                                                                                <![endif]-->
                                                                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                                                        <tr>
                                                                                            <td align="center" style="font-size:0px;padding:8px 0 0 0;word-break:break-word;">
                                                                                                <div style="font-family:-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;font-size:22px;font-weight:600;line-height:1.2;text-align:center;color:#000000;">Alteração de senha</div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                                <!--[if mso | IE]>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <![endif]-->
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--[if mso | IE]>
                                            </td>
                                        </tr>
                                    </table>
                                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:520px;" width="520"
                    >
                                        <tr>
                                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                                                <![endif]-->
                                                <div style="margin:0px auto;max-width:520px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                                                                    <!--[if mso | IE]>
                                                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td
                            class="" style="vertical-align:top;width:520px;"
                            >
                                                                                <![endif]-->
                                                                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                                                        <tr>
                                                                                            <td align="center" style="font-size:0px;padding:16px 16px 0 16px;word-break:break-word;">
                                                                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style="width:300px">
                                                                                                                <img alt="Símbolo do Pega a Visão" height="auto" src="https://cdn.discordapp.com/attachments/539836343094870016/851139325483155476/navbar_logo.png" style="margin-left:auto;margin-right:auto;border:0;border-radius:12px;display:block;outline:none;text-decoration:none;height:auto;width:50%;font-size:13px;"
                                                width="500" />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                                <!--[if mso | IE]>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <![endif]-->
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--[if mso | IE]>
                                            </td>
                                        </tr>
                                    </table>
                                    <![endif]-->
                                    <!-- body content -->
                                    <!--[if mso | IE]>
                                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:520px;" width="520"
                    >
                                        <tr>
                                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                                                <![endif]-->
                                                <div style="margin:0px auto;max-width:520px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="direction:ltr;font-size:0px;padding:12px 10% 0 10%;text-align:center;">
                                                                    <!--[if mso | IE]>
                                                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td
                            class="" style="vertical-align:top;width:500px;"
                            >
                                                                                <![endif]-->
                                                                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                                                        <tr>
                                                                                            <td align="left" style="font-size:0px;padding:8px 0 16px 0;word-break:break-word;">
                                                                                                <div style="font-family:-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;font-size:18px;font-weight:600;line-height:1.4;text-align:center;color:#8E8E92;">
                                                                                                    <span style="color: #000000;">Altere sua senha pelo link abaixo.</span> Caso não tenha solicitado uma nova senha, por favor ignore esse e-mail.
                                                                                                </div>
                                                                                                <div style="font-family:-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;font-size:18px;font-weight:600;line-height:5;text-align:center;color:#8E8E92;">
                                                                                                    <a style="color: #4d4dff;text-decoration: none;" href="`+ link + `"> Clique aqui para alterar a senha</a>️
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td style="font-size:0px;word-break:break-word;">
                                                                                                <!--[if mso | IE]>
                                                                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                                                                    <tr>
                                                                                                        <td height="8" style="vertical-align:top;height:8px;">
                                                                                                            <![endif]-->
                                                                                                            <!--[if mso | IE]>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                                <![endif]-->
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                                <!--[if mso | IE]>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <![endif]-->
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--[if mso | IE]>
                                            </td>
                                        </tr>
                                    </table>
                                    <![endif]-->
                                    <!-- footer -->
                                    <!--[if mso | IE]>
                                    <table
                        align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:520px;" width="520"
                    >
                                        <tr>
                                            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                                                <![endif]-->
                                                <div style="margin:0px auto;max-width:520px;">
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="direction:ltr;font-size:0px;padding:30px 16px 32px 16px;text-align:center;">
                                                                    <!--[if mso | IE]>
                                                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td
                            class="" style="vertical-align:top;width:488px;"
                            >
                                                                                <![endif]-->
                                                                                <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                                                                        <tr>
                                                                                            <td align="center" vertical-align="middle" style="font-size:0px;padding:0;padding-top:0px;word-break:break-word;">
                                                                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;">
                                                                                                    <tr>
                                                                                                        <td align="center" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:0px 0;background:none;" valign="middle">
                                                                                                            <a href="https://github.com/CorchoForce" style="display:inline-block;background:none;color:#8E8E92;font-family:-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;font-size:11px;font-weight:500;line-height:0;margin:0;text-decoration:none;text-transform:none;padding:0px 0;mso-padding-alt:0px;border-radius:3px;" target="_blank">
                            ©2021 CorchoForce
                            </a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                                <!--[if mso | IE]>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <![endif]-->
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!--[if mso | IE]>
                                            </td>
                                        </tr>
                                    </table>
                                    <![endif]-->
                                </div>
                                <br/>
                            </body>
                        </html>
        `
    }
    smtpTransport.sendMail(mailOptions, (error) => {
        if (error) {
            res.status(418).json({message: "Erro inesperado ao enviar o email de confirmação."})        
        } else {
            res.status(200).json({ message: "Email enviado" });
        }
    });
}

module.exports = sendPasswordEmail;
