const settings = require('./settings/appSettings');
const app = require('./app');
const routes = require('./lib/routes');

app.use('/', routes);
app.listen(settings.port);
