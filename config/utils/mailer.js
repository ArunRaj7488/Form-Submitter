const nodemailer = require('nodemailer')
const config = require('../config')
const mailer = {
    
    sendEmail(email){
        const {to, subject, emailText } = email;
        const transporterObj  = {
            service : config.SMTP_SERVICE || process.env.SMTP_SERVICE,
            auth : {
                user : config.SMTP_MAIL_ID || process.env.SMTP_MAIL_ID,
                pass : config.SMTP_MAIL_PASS || process.env.SMTP_MAIL_PASS
            }
          }
        const transporter = nodemailer.createTransport(transporterObj);
        console.log(transporterObj)

        const mailOptions = {
            from : config.COMPANY_NAME || process.env.COMPANY_NAME,
            to, //sending to user email
            subject, // Subject line
            text: emailText, // plaintext body
            html : '<h1>'+emailText+'</h1>'
        }
        console.log(mailOptions)
        transporter.sendMail(mailOptions)
    }
}

module.exports = mailer