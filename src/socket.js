const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');

const socketIO = new Server();

const jwtKey = process.env.JWT_KEY || 'default';

socketIO.on('connection', (socket) => {

    let token = socket.handshake.query.token;

    if (!token) {

        socket.disconnect();
        return;
    }

    let user;

    try {

        user = jwt.verify(token, jwtKey);

    } catch (e) {

        socket.disconnect();
        return;
    };

    if (user) {

        userModel.findOne({ username: user }).catch(() => {

            socket.disconnect();
            return;
        });
    }
});

const PORT = process.env.SOCKET_PORT | 5555;

socketIO.listen(PORT);

module.exports = socketIO;