const aedes = require('aedes')();
const net = require('net');

const PORT = 1883;

const server = net.createServer(aedes.handle);

server.listen(PORT, function () {
  console.log('Mock MQTT broker started on port', PORT);
});