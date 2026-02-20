const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const knex = require('../db');

router.post("/", async (req, res) => {
    const { to } = req.body;

    if (!to) {
        return res.status(400).json({ success: false, error: "No email!" });
    }

    try {
        const user = await knex("users").where("email", to).first();

        if (!user) {
            return res.status(400).json({ success: false, error: "Sähköpostia ei löydy!" });
        }

        // Generate verification code and store it
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await knex("verification_codes").insert({
            email: to,
            code,
            expiresAt
        });

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'alyroskis173@gmail.com',
                pass: 'lwjg abgr ywpa odmp'
            }
        });

        let mailOptions = {
            from: 'alyroskis173@gmail.com',
            to,
            subject: 'Salasanan palautus',
            text: "Anna tämä vahvistuskoodi palauttaaksesi salasanasi: " + code
        };

        let info = await transporter.sendMail(mailOptions);
        res.json({ success: true, response: info.response });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
