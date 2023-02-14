const jwt = require('jsonwebtoken');
const model = require('../models/user');

const jwtKey = process.env.JWT_KEY || 'default';

const signin = async (request, response) => {

    const { username, password } = request.body;

    if (!username || !password) {

        response.status(400).end(JSON.stringify({
            status: 'error',
            message: 'either the username or password is not valid'
        }));

        return;
    }

    const user = await model.findOne({ username: username, password: password });

    if (user) {

        const token = jwt.sign(username, jwtKey);

        response.status(200).end(JSON.stringify({
            status: 'auth success',
            token: token,
        }));

        return;
    }

    response.status(400).end(JSON.stringify({
        status: 'error',
        message: 'credentials are not valid'
    }));
};

const signup = async (request, response) => {

    const { username, password } = request.body;

    if (!username || !password) {

        response.status(400).end(JSON.stringify({
            status: 'error',
            message: 'either the username or password is not valid'
        }));

        return;
    }

    const user = await model.findOne({ username: username });

    if (user) {

        response.status(400).end(JSON.stringify({
            status: 'error',
            message: 'this username already exists'
        }));

        return;
    }

    await model({ username: username, password: password }).save();

    response.status(200).end(JSON.stringify({
        status: 'success',
        message: 'the user has successfully registered'
    }));
};

module.exports = { signin, signup };