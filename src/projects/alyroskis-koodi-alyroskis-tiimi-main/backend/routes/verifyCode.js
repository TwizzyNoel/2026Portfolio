const express = require('express');
const router = express.Router();
const knex = require('../db');

router.post("/", async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ success: false, error: "Email and code are required!" });
    }

    try {
        const record = await knex("verification_codes")
            .where({ email, code })
            .andWhere("expiresAt", ">", new Date())
            .first();
        
        if (!record) {
            return res.status(400).json({ success: false, error: "Invalid or expired code!" });
        }

        await knex("verification_codes")
            .where({ email, code })
            .del();

        res.json({ success: true, message: "Code verified!" });
    } catch (error) {
        console.error("Error verifying code: ", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
