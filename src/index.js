require('dotenv').config();

const express = require('express');
const app = express();

const database = require('./database');
const routes = require('./routes/auth'); /* routes */

app.use(express.json()); /* JSON Parser */

app.use('/', routes);

const port = process.env.PORT || 80; /* server listening port */

app.listen(port, () => console.log("Server up"));

database.then(() => console.log('Database up'));