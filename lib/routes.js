const express = require('express');
const router = express.Router();
var path = require('path');
const home = require('./controllers/home');

router.use(express.static(path.join(__dirname, '../dist')));
//router.get('/', home.init);

module.exports = router;
