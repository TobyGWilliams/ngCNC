import Server from './server/server';
import SerialComms from './serial/serial';
import Socket from './socket/socket';

let serial = new SerialComms();
serial.list();

let server = new Server();

let socket = new Socket(server.server);
