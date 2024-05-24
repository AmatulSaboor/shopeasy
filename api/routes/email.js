const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    // Configure the email transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
            user: 'amatulsaboor221@gmail.com',
            pass: 'qmmn eiqe zpmi tsgx'
        }
    });

    // Email options
    let mailOptions = {
        from: 'amatulsaboor221@gmail.com',
        to: 'amatulsaboor221@gmail.com',
        subject: 'test',
        text: 'I hope to see you in my inbox inshaAllah'
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent', info });
    } catch (error) {
        res.status(500).send({ message: 'Error sending email', error });
    }
});

module.exports = router