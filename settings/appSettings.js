module.exports.production = false;
module.exports.port = (module.exports.production ? process.env.PORT : 3123);
