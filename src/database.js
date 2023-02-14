const mongoose = require('mongoose');

const host = process.env.DATABASE_HOST;
const name = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const pass = process.env.DATABASE_PASS;

const DB = `mongodb+srv://${user}:${pass}@${host}/${name}?retryWrites=true&w=majority`;

const connect = mongoose.connect(DB);

module.exports = connect;