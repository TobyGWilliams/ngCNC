const debug = require('debug')('app:socket');
var io = require('socket.io');

export default class Socket {
  constructor(server) {
    var io = require('socket.io').listen(server);
    io.on('connection', socket => {
      debug('a user connected');
      socket.emit('message', 'Hello World');
      socket.on('disconnect', () => {
        debug('user disconnected');
      });
    });
  }
}
