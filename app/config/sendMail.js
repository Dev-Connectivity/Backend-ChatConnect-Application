/*
required files
*/
import env from '../../env';

const nodemailer = require('nodemailer');

/**
 * sendEmailFunction
 * @param {String} url - Verification URL or reset password link
 */
exports.sendmailServices = (url, subject, is_html) => {
    // Create a transporter using nodemailer
    const transporter = nodemailer.createTransport({
        service: env.SERVICE,
        host: env.HOST,
        address: env.ADDRESS,
        secureConnection: false,
        port: env.MAIL_PORT,
        /*
        email and password are hidden by using of env file
        */
        auth: {
            user: env.email,
            pass: env.password
        },
    });

    // Define mail options
    const mailOptions = {
        from: env.MAIL_FROM,
        to: env.MAIL_FROM,
        subject,
        ...(is_html && { html: url }),
        ...(is_html || { text: url }),
    };

    // if mail content is html
    delete mailOptions.text;

    /*
    send mail from given mail id, by using authorization info
    */
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("Error occurred while sending mail:", err);
        } else {
            console.log('Result of sending mail:', info);
        }
    });
};

