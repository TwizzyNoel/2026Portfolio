let express = require("express");
let router = express.Router();
const knex = require("../db.js");
const { sendPushNotification } = require("../utils/notifications.js");

// Send notification to all users
router.post("/all", async (req, res) => {
  const { title, body } = req.body;

  try {
    await knex("notification_log").insert({ userID: null, title, body });

    const tokens = await knex("user_push_tokens").select("expo_push_token");

    if (!tokens.length) {
      return res.status(404).json({ message: "No push tokens found" });
    }

    await Promise.all(
      tokens.map(async (token) => {
        try {
          await sendPushNotification(token.expo_push_token, title, body);
        } catch (err) {
          console.error("Failed to send to token:", token.expo_push_token, err);
        }
      })
    );

    res.json({ success: true, sent: tokens.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

router.post("/:userID", async (req, res) => {
  const { userID } = req.params;
  const { title, body } = req.body;

  try {
    const [notificationID] = await knex("notification_log").insert({
      userID,
      title,
      body,
    });

    const tokens = await knex("user_push_tokens")
      .where({ userID })
      .select("expo_push_token");

    if (!tokens.length) {
      return res
        .status(404)
        .json({ message: "No push tokens found for this user" });
    }

    await Promise.all(
      tokens.map(async (token) => {
        await sendPushNotification(
          token.expo_push_token,
          title,
          body,
          notificationID
        );
      })
    );

    res.json({ success: true, sent: tokens.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

router.put("/:userId/mark-read", async (req, res) => {
  const { userId } = req.params;
  const { notificationIds } = req.body;

  if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
    return res.status(400).json({ error: "NotificationIds required" });
  }

  try {
    await knex("notification_log")
      .where({ userID: userId })
      .whereIn("notificationID", notificationIds)
      .update({ read: true, updated_at: knex.fn.now() });

    res.json({
      message: "Notifications are marked as read",
      count: notificationIds.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update notification" });
  }
});

module.exports = router;
