var path = require('path');
const express = require('express');
const home = require('./controllers/home');

module.exports = (app, io) => {
  // app routes
  app.use(express.static(path.join(__dirname, '../dist')))

  // io routes
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      console.log(`Disconnected ID: ${socket.id}`);
    });
  });
};
