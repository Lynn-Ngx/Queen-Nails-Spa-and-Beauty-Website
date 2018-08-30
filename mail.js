const nodemailer = require('nodemailer');

/*
    let img = await page.screenshot();
    attachment.push({filename: imageName + '.jpg', content: img})
 */

// user: 'instabotismail@gmail.com',
//     pass: 'Ismail8799'
const sendMail = (subject, message, attachment) => {
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'queen.nails.beauty217@gmail.com',
                pass: 'treatyourself'
            }
        });

        let mailOptions = {
            from: '💈 Queen Nails Spa and Beauty 💈',
            to: 'queen.nails.beauty217@gmail.com',
            subject: subject,
            text: message,
            attachments: attachment
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);
            console.log('Email sent: ' + info.response);
        });
    });
};

module.exports = sendMail;