const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

export class Server {
  constructor() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../dist'))); // Point static path to dist
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });

    app.set('port', port);
    const port = '3000'; //Get port from environment and store in Express.
    this.server = http.createServer(app); // * Create HTTP server.
    this.server.listen(port, () =>
      console.log(`API running on localhost:${port}`)
    );
  }
}

module.exports = Server;
