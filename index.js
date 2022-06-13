require('dotenv').config()
require('./connections/db')

const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const router = require('./routes/users');
const app = new express();

app.use(express.json())

app.use(
    cors({
      origin: '*', // allow to server to accept request from different origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // allow session cookie from browser to pass through
    }),
);

const port = process.env.PORT || '8000'

app.use('/', router);

app.listen(port, () => {
    logger.log('info', `Server is running`);
})
