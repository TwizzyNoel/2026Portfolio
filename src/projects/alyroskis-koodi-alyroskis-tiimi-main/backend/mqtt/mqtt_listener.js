// Simple Node.js Express app with MQTT integration
// 1. Install dependencies: npm install express mqtt

const express = require('express');
const mqtt = require('mqtt');
const knex = require('../db');

const router = express.Router();

// MQTT broker URL (replace with your broker address if needed)
const mqttUrl = 'mqtt://localhost:1883' //'mqtt://test.mosquitto.org';
const topic = 'anything/something' // 'test/topic';

// Connect to MQTT broker
const mqttClient = mqtt.connect(mqttUrl);

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

mqttClient.on('message', async(topic, message) => {
    // message is a Buffer
    try{
        console.log(`Received message on ${topic}: ${message.toString()}`);

        //Check that the message format is right
        let parsed;
        try {
            parsed = JSON.parse(message.toString());
        } catch(e){
            console.warn("invalid JSON message");
            return;
        }

        const { distance, mac } = parsed;

        if (typeof distance !== 'number' || !mac) {
            console.warn('Message format is invalid:', parsed);
            return;
        }

        //seek and join smart_trash to IOT_machines
        const result = await knex ("IOT_machines as im")
        .join("smart_trash as st", "im.trashID", "st.trashID")
        .select("im.trashID", "st.height")
        .where('im.MAC_address', mac)
        .first();

        const { trashID, height } = result;
        // add zero division check
        if (!height || height <= 0) {
            console.warn(`Invalid height for trashID ${trashID}`);
            return;
        }

        //calculate the alarm threshold
        const alarm_treshold = Math.ceil(((height - distance) / height) * 100);

        await knex("smart_trash")
        .where("trashID", trashID)
        .update({ alarm_treshold: alarm_treshold });
    } catch(err) {
        console.error('Error processing MQTT message:', err);
    }
});

router.get('/', (req, res) => {
    res.send('MQTT listener is running and listening for MQTT messages.');
});

router.get('/send', (req, res) => {
    const testTopic = 'anything/something'; // or any topic you want
    const testMessage = JSON.stringify({ distance: 99, mac: 'AA:BB:CC:DD:EE:FF' });
    mqttClient.publish(topic, testMessage, () => {
        res.send(`Message sent to ${testTopic}: ${testMessage}`);
    });
});

module.exports = router;