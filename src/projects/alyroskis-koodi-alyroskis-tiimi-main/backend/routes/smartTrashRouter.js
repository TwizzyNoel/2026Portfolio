let express = require("express");
let router = express.Router();
const knex = require("../db");
const { sendPushNotification } = require("../utils/notifications.js");

router.get("/", (req, res, next) => {
  return knex("smart_trash")
    .select("*")
    .then((smart_trash) => {
      res.json(smart_trash);
    })
    .catch((err) => {
      console.log("Error fetching smart_trash:", err.message);
      res.status(500).json({
        error: "Failed to fetch smart_trash",
        details: err.message,
      });
    });
});

router.get("/:campusID", (req, res, next) => {
  const campusID = req.params.campusID;
  return knex("smart_trash")
    .join("building", "building.buildingID", "smart_trash.building")
    .join("campus", "campus.campusID", "building.campusID")
    .select(
      "*",
      "building.name as buildingName",
      "building.buildingID",
      "campus.campusID"
    )
    .where("campus.campusID", campusID)
    .then((smart_trash) => {
      res.json(smart_trash);
    })
    .catch((err) => {
      console.log("Error fetching smart_trash:", err.message);
      res.status(500).json({
        error: "Failed to fetch smart_trash",
        details: err.message,
      });
    });
});

router.get("/:campusID/:trashID", (req, res, next) => {
  const { campusID, trashID } = req.params;

  return knex("smart_trash")
    .join("building", "building.buildingID", "smart_trash.building")
    .join("campus", "campus.campusID", "building.campusID")
    .join("trash_types", "trash_types.typeID", "smart_trash.trashTypeID")
    .leftJoin("emptying_log", "emptying_log.trashID", "smart_trash.trashID")
    .select(
      "smart_trash.trashID",
      "smart_trash.trashTypeID",
      "smart_trash.longitude",
      "smart_trash.latitude",
      "smart_trash.contactUserID",
      "smart_trash.optional_description",
      "smart_trash.building",
      "smart_trash.height",
      "smart_trash.alarm_treshold",
      "building.buildingID",
      "campus.campusID",
      "building.name as buildingName",
      "campus.name as campusName",
      "trash_types.name as typeName",
      knex.raw(
        "DATE_FORMAT(emptying_log.dateTime, '%d.%m.%Y %H:%i') as formattedDate"
      )
    )
    .where("campus.campusID", campusID)
    .where("smart_trash.trashID", trashID)
    .orderBy("emptying_log.dateTime", "desc") // show the latest first
    .limit(1) // only one row
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.log("Error fetching smart_trash:", err.message);
      res.status(500).json({
        error: "Failed to fetch smart_trash",
        details: err.message,
      });
    });
});

router.patch("/:trashID", async (req, res, next) => {
  const { trashID } = req.params;

  try {
    const lastMeasurement = await knex("measurement_log")
      .where({ machineID: trashID })
      .orderBy("dateTime", "desc")
      .first();

    if (!lastMeasurement)
      return res.status(404).json({ message: "No measurement found" });

    const { measurement_value } = lastMeasurement;

    let trash = await knex("smart_trash").where({ trashID }).first();

    if (!trash) return res.status(404).json({ message: "Trash not found" });

    await knex("smart_trash")
      .where({ trashID })
      .update({ alarm_treshold: measurement_value });

    trash = await knex("smart_trash").where({ trashID }).first();

    // check if the trash is 80% full
    if (measurement_value >= 80 && !trash.notified_80) {
      const tokens = await knex("user_push_tokens")
        .where({ userID: trash.contactUserID })
        .select("expo_push_token");

      if (tokens.length > 0) {
        const title = "New Trash Alert";
        const body = `Roskis #${trash.trashID} on ${measurement_value}% täynnä`;

        await Promise.all(
          tokens.map((token) =>
            sendPushNotification(token.expo_push_token, title, body)
          )
        );

        // save a push notification
        await knex("notification_log").insert({
          userID: trash.contactUserID,
          title,
          body,
        });

        // make flag true that the message was sent only 1 time
        await knex("smart_trash")
          .where({ trashID })
          .update({ notified_80: true });
      }
    }

    // if it is less than 80%
    if (measurement_value < 80 && trash.notified_80) {
      await knex("smart_trash")
        .where({ trashID })
        .update({ notified_80: false });
    }

    res.json({ success: true, trashID, alarm_treshold: measurement_value });
  } catch (err) {
    console.error("Error fetching smart_trash:", err);
    res.status(500).json({
      error: "Failed to fetch smart_trash",
      details: err.message,
    });
  }
});

router.put("/full", async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "No IDs provided" });
  }

  try {
   await knex("smart_trash")
      .whereIn("trashID", ids)
      .update({ alarm_treshold: 80});

    res.json({ success: true, updated: ids.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to set trash full" });
  }
});

router.put("/empty", async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "No IDs provided" });
  }

  try {
    await knex("smart_trash")
      .whereIn("trashID", ids)
      .update({ alarm_treshold: 0 });

      const logs = ids.map(id => ({
        trashID: id,
        dateTime: new Date(),
      }))
      await knex("emptying_log")
        .insert(logs);

      res.json({ success: true, updated: ids.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to set trash empty" });
  }
});

module.exports = router;
