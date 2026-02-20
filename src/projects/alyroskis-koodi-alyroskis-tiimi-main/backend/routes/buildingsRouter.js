var express = require("express");
var router = express.Router();
const knex = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

router.get("/", (req, res, next) => {
  return knex("building")
    .select("*")
    .then((buildings) => {
      res.json(buildings);
    })
    .catch((err) => {
      console.log("Error fetching buildings:", err.message);
      res.status(500).json({
        error: "Failed to fetch buildings",
        details: err.message,
      });
    });
});

router.get("/:campusID", (req, res, next) => {
  const campusID = req.params.campusID;

  knex("building")
    .select("buildingID", "name")
    .where("campusID", campusID)
    .then((buildings) => {
      res.json(buildings);
    })
    .catch((err) => {
      console.log("Error fetching buildings:", err.message);
      res.status(500).json({
        error: "Failed to fetch buildings",
        details: err.message,
      });
    });
});

module.exports = router;
