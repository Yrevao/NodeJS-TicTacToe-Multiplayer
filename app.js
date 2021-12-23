const express = require('express');
const app = express();

// connection testing
app.get('/test', (req, res) => {
    res.status(200).send('test test 123');
});

// middleware
app.use(express.json());

module.exports = app;
