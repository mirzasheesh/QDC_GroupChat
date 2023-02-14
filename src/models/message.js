const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },
});

const collection = "messages";

const messageModel = mongoose.model(collection, messageSchema);

module.exports = messageModel;