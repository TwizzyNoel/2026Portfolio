let express = require("express");
let router = express.Router();
const knex = require("../db");

router.post("/register", async (req, res) => {
  try {
    const { expo_push_token } = req.body;
    const userID = res.locals.auth.userId;

    console.log("Received token from frontend:", expo_push_token);

    if (!expo_push_token) {
      return res.status(400).json({ error: "No token provided" });
    }

    await knex("user_push_tokens")
      .insert({ userID: userID, expo_push_token })
      .onConflict(["userID", "expo_push_token"])
      .ignore();

    console.log("Token saved to database for userID:", userID || 2);

    res.json({ success: true });
  } catch (err) {
    console.error("Failed to save token:", err);
    res.status(500).json({ error: "Failed to save token" });
  }
});

router.post("/unregister", async (req, res) => {
  const { expo_push_token } = req.body;

  try {
    await knex("user_push_tokens").where({ expo_push_token }).del();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unregister expo_push_token" });
  }
});

module.exports = router;
