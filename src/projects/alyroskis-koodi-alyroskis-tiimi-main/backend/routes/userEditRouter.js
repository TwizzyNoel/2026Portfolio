let express = require("express");
let router = express.Router();
const knex = require("../db");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  return knex("users")
    .select("*")
    .where("user_type", 2)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log("Error fetching users:", err.message);
      res.status(500).json({
        error: "Failed to fetch users",
        details: err.message,
      });
    });
});


router.get("/campuses/buildings/:campusID", async (req, res) => {
  const { campusID } = req.params;
  try {
    const buildings = await knex("building")
      .where({ campusID })

      .select("buildingID", "name");
    res.json(buildings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch buildings" });
  }
});

router.get("/campuses", async (req, res) => {
  try {
    const campuses = await knex("campus").select("*");

    res.json(campuses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch campuses" });
  }
});

router.get("/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const data = await knex("maintenance_person as mp")
      .select(
        "u.userID",
        "u.fullname",
        "u.email",
        "u.phone",
        "u.user_type",
        "b.buildingID",
        "b.name as building",
        "c.campusID",
        "c.name as campus"
      )
      .join("users as u", "mp.userID", "u.userID")
      .leftJoin("building as b", "mp.buildingID", "b.buildingID")
      .leftJoin("campus as c", "b.campusID", "c.campusID")
      .where("u.userID", userID);

    res.json(data);
    console.log(data);
  } catch (err) {
    console.error("Error fetching maintenance person:", err.message);
    res.status(500).json({
      error: "Failed to fetch maintenance person data",
      details: err.message,
    });
  }
});

router.put("/:userID", async (req, res) => {
  const { userID } = req.params;
  const { fullname, email, phone, user_type, buildingID } = req.body;
  
  try {
    await knex("users")
      .where({ userID })
      .update({ fullname, email, phone, user_type });

    await knex("maintenance_person")
      .where({ userID })
      .update({ buildingID });

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).json({ error: "Failed to update user", details: err.message });
  }
});

router.put("/password/:userID", async (req, res) => {
  const { userID } = req.params;
  const { password } = req.body;
  
  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await knex("users")
      .where({ userID })
      .update({ password: hashedPassword });

    res.json({ message: "User's password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err.message);
    res.status(500).json({ error: "Failed to update password", details: err.message });
  }
});

module.exports = router;