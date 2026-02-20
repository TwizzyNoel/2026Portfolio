const mqtt = require('mqtt');

// Connect to the local broker
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  let counter = 0;
  function getCyclicDistance() {
    // mock filling trash level
    return 100 - (counter++ % 101);
  }

  setInterval(() => {
    const message = {"distance": getCyclicDistance(), "mac": "00:1B:44:11:3A:B7"};
    client.publish('anything/something', JSON.stringify(message));
    console.log('Published:', message);
  }, 10000); // 10 seconds
});