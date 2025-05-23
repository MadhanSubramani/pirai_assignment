const express = require('express');
const server = express();
require('dotenv').config();
const authRoutes = require('./routes/auth.route');
const todoRoutes = require('./routes/todo.route');
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json({limit: '5mb'}))

server.use('/api',authRoutes);
server.use('/api',todoRoutes);

const port = process.env.PORT;

server.listen(port, () => {
    console.info('Server is listening on ', port);
})