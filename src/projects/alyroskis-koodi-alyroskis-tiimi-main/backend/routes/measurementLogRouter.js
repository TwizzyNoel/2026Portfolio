let express = require("express");
let router = express.Router();
const knex = require("../db");

router.put("/:trashID", async (req, res, next) => {
    const { trashID } = req.params;
    
    try {
        const lastMeasurement = await knex("measurement_log")
            .where({ machineID: trashID })
            .orderBy("dateTime", "desc")
            .first();

            if (!lastMeasurement) {
                return res.status(404).json({ message: "No measurement found" });
            }
        
        const { measurement_value } = lastMeasurement;

        const trash = await knex("smart_trash").where({ trashID }).first();

        if (!trash) {
            return res.status(404).json({ message: "Trash not found" });
        }

        const percent =  Math.round((measurement_value / trash.height) * 100);

        await knex("smart_trash")
            .where({ trashID })
            .update({ alarm_treshold: percent });        

        res.json({ success: true, trashID, alarm_treshold: percent });
    } catch (err) {
        res.status(500).json({ error: "Failed to update alarm_treshold" });
    }
    });

module.exports = router;