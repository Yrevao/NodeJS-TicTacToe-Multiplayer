var path = require('path');
const express = require('express');
const home = require('./controllers/home');

module.exports = (app, io) => {
  // app routes

  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('/test', (req, res) => {
    res.status(200).send('test 123');
  });

  app.post('/join', (req, res) => {
    res.json({a: req.body.player, b: req.query.match});
  });

  // io routes
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      console.log(`Disconnected ID: ${socket.id}`);
    });
  });
};
