const express = require('express');
const router = express.Router();

const { signin, signup } = require('../controllers/user');
const { sendMessage, listMessage } = require('../controllers/message');

router.post('/auth/signin', signin); /* for signin */
router.post('/auth/signup', signup); /* for signup */

router.get('/message', listMessage); /* to get all message */
router.post('/message', sendMessage); /* to post a new message */

module.exports = router;