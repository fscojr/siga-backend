const AppError = require('../utils/appError');
const nodemailer = require('nodemailer');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

exports.enviaEmail = async (req, res, next) => {

    try {

        let transporter = nodemailer.createTransport({
            host: 'smtp.prf.gov.br',
            port: 587,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        });

        let emailASerEnviado = {
            from: `${SMTP_USER}@prf.gov.br`,
            to: 'thyago.brejao@gmail.com',
            subject: 'Enviando Email com Node.js',
            text: 'Estou te enviando este email com node.js',
        };

        // send mail with defined transport object
        let info = await transporter.sendMail(emailASerEnviado);

        console.log(info)

        res.json(info.messageId)
    } catch (e) {
        return next(new AppError(401, 'fail', `Erro no envio - ${e.message}`), req, res, next);
    }
};

