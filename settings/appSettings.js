module.exports.production = true;
module.exports.port = (module.exports.production ? process.env.PORT : 3123);
