var path = require('path');
const express = require('express');
const home = require('./controllers/home');

module.exports = (app, io) => {
  // app routes
  app.use(express.static(path.join(__dirname, '../dist')));

  app.post('/', (req, res) => {
    res.json({a: req.body.ID});
  });

  // io routes
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      console.log(`Disconnected ID: ${socket.id}`);
    });
  });
};
