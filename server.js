const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const state = require('./lib/state.js');
const settings = require('./settings/appSettings');

// middlewares
app.use(express.json());                          // json parser middleware
const routes = require('./lib/routes')(app, io, state);  // allow defined app and io to be used in the separate routing module

server.listen(settings.port);

// export app for unit tests
module.exports.app = app;
module.exports.server = server;
