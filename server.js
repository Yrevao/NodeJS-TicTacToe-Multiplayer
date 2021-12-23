const app = require('./app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const settings = require('./settings/appSettings');

// allow defined app and io to be used in the separate routing module
const routes = require('./lib/routes')(app, io);

server.listen(settings.port);
