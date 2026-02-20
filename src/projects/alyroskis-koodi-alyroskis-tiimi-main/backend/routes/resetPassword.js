const express = require('express');
const router = express.Router();
const knex = require('../db');
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const { email, newPassword} = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ success: false, error: "Email and new password is required!" });
    }

    try {
        const user = await knex("users").where({ email }).first();

        if (!user) {
            return res.status(400).json({ success: false, error: "User not found!"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await knex("users")
            .where({ email })
            .update({ password: hashedPassword });
        
        await knex("verification_codes")
            .where({ email })
            .del();
        
        res.json({ success: true, message: "Password reset succesfully!" });
    } catch (error) {
        console.error("Error resetting the password: ", error);
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
