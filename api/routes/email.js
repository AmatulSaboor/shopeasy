require('dotenv').config();
const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { to, subject, body } = req.body;
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent', info });
    } catch (error) {
        res.status(500).send({ message: 'Error sending email', error });
    }
});

module.exports = router