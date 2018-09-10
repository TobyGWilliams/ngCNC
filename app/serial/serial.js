const Serial = require('serialport');

export default class SerialComms {
  constructor() {}
  list() {
    Serial.list(function(err, ports) {
      ports.forEach(function(port) {
        console.log(port.comName);
        console.log(port.pnpId);
        console.log(port.manufacturer);
      });
    });
  }
}
