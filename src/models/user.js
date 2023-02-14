const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
});

const collection = "users";

const userModel = mongoose.model(collection, userSchema);

module.exports = userModel;