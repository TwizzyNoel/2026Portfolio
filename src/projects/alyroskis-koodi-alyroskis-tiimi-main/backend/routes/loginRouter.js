var express = require('express');
var router = express.Router();
const knex = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

router.post('/', function (req, res, next) {
    const user = req.body;

    knex('users')
        .join('maintenance_person', 'users.userID', 'maintenance_person.userID')
        .join('building', 'maintenance_person.buildingID', 'building.buildingID')
        .join('campus', 'building.buildingID', 'campus.campusID')
        .select(
            'users.*',
            'campus.campusID'
        ) 
        .where('email', '=', user.email)
        .then((dbuser) => {
            if (dbuser.length == 0) {
                knex('users')
                    .select('users.*')
                    .where('email', '=', user.email)
                    .then((adminUser) => {
                        if (adminUser.length == 0) {
                            return res.status(401).json({ error: "invalid email or password" });
                        }
                        const tempUser = adminUser[0];
                        bcrypt.compare(user.password, tempUser.password)
                            .then((passwordCorrect) => {
                                if (!passwordCorrect) {
                                    return res.status(401).json({ error: "invalid email or password" });
                                }
                                const userForToken = {
                                    userID: tempUser.userID,
                                    user_type: tempUser.user_type,
                                    email: tempUser.email,
                                    phone: tempUser.phone,
                                    fullname: tempUser.fullname,
                                    buildingName: tempUser.buildingName || null,
                                    campusID: tempUser.campusID || null
                                }
                                const token = jwt.sign(userForToken, config.SECRET, { expiresIn: '7d' });
                                console.log("token", token,
                                    "id", tempUser.userID,
                                    "email", tempUser.email,
                                    "role", tempUser.user_type,
                                    "campusID", tempUser.campusID
                                );
                                res.status(200).send({
                                    token, userForToken,
                                    userID: tempUser.userID,
                                    user_type: tempUser.user_type,
                                    email: tempUser.email,
                                    phone: tempUser.phone,
                                    fullname: tempUser.fullname,
                                    buildingName: tempUser.buildingName || null,
                                    campusID: tempUser.campusID || null
                                });
                            })
                            .catch((bcryptError) => {
                                console.error('Error comparing password for email:', user.email, bcryptError);
                                res.status(500).json({ error: 'Password comparison failed' });
                            });
                    })
                    .catch((dbError) => {
                        console.error('Error fetching admin user from database for email:', user.email, dbError);
                        res.status(500).json({ error: 'Database query failed' });
                    });
            } else {
                const tempUser = dbuser[0];
                bcrypt.compare(user.password, tempUser.password)
                    .then((passwordCorrect) => {
                        if (!passwordCorrect) {
                            return res.status(401).json({ error: "invalid email or password" });
                        }
                        const userForToken = {
                            userID: tempUser.userID,
                            user_type: tempUser.user_type,
                            email: tempUser.email,
                            phone: tempUser.phone,
                            fullname: tempUser.fullname,
                            buildingName: tempUser.buildingName,
                            campusID: tempUser.campusID
                        }
                        const token = jwt.sign(userForToken, config.SECRET, { expiresIn: '7d' });
                        console.log("token", token,
                            "id", tempUser.userID,
                            "email", tempUser.email,
                            "role", "regularuser",
                            "campusID", tempUser.campusID
                        );
                        res.status(200).send({
                            token, userForToken,
                            userID: tempUser.userID,
                            user_type: tempUser.user_type,
                            email: tempUser.email,
                            phone: tempUser.phone,
                            fullname: tempUser.fullname,
                            buildingName: tempUser.buildingName,
                            campusID: tempUser.campusID
                        });
                    })
                    .catch((bcryptError) => {
                        console.error('Error comparing password for email:', user.email, bcryptError);
                        res.status(500).json({ error: 'Password comparison failed' });
                    });
            }
        })
        .catch((dbError) => {
            console.error('Error fetching user from database for email:', user.email, dbError);
            res.status(500).json({ error: 'Database query failed' });
        });
});

module.exports = router;    