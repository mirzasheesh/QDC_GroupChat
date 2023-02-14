const jwt = require('jsonwebtoken');
const model = require('../models/message');
const userModel = require('../models/user');
const socketIO = require('../socket');

const jwtKey = process.env.JWT_KEY || 'default';

const sendMessage = async (request, response) => {

    const { token, message } = request.body;

    if (!token || !message) {

        response.status(400).end(JSON.stringify({
            status: 'error',
            message: 'either the token or message is not valid'
        }));

        return;
    }

    let user;

    try {
        user = jwt.verify(token, jwtKey);

    } catch (e) { };

    if (user) {

        const validUser = await userModel.findOne({ username: user });

        if (validUser) {

            await model({ username: user, message: message }).save();

            socketIO.emit('message', { username: user, message: message });

            response.status(200).end(JSON.stringify({
                status: 'success'
            }));

            return;
        }
    }

    response.status(400).end(JSON.stringify({
        status: 'error',
        message: 'credentials are not valid'
    }));
}

const listMessage = async (request, response) => {

    const { token } = request.body;

    if (!token) {

        response.status(400).end(JSON.stringify({
            status: 'error',
            message: 'token is not provided'
        }));

        return;
    }

    let user;

    try {
        user = jwt.verify(token, jwtKey);

    } catch (e) { };

    if (user) {

        const validUser = await userModel.findOne({ username: user });

        if (validUser) {

            const messages = await model.find();

            response.status(200).end(JSON.stringify({
                status: 'success',
                messages: messages,
            }));

            return;
        }
    }

    response.status(400).end(JSON.stringify({
        status: 'error',
        message: 'credentials are not valid'
    }));
}

module.exports = { sendMessage, listMessage };