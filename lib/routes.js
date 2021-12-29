var path = require('path');
const express = require('express');

// controllers
const join = require('./controllers/join');



module.exports = (app, io, state) => {
  // static features
  app.use(express.static(path.join(__dirname, '../dist')));
  app.use('/join', express.static(path.join(__dirname, '../dist')));

  // api routes
  // basic controller test
  app.get('/test', (req, res) => {
    res.status(200).send('test 123');
  });

  // attempt to join match with player ID in body and match ID in query
  app.post('/join', (req, res) => {
    join(req, res, state);
  });

  // io routes
  io.on('connection', (socket) => {
    // clean client from state on disconnect
    socket.on('disconnect', () => {
      console.log(`Disconnected ID: ${socket.id}`);
    });

    // associate playerID (socket.id) with that id's socket so that the socket can be added to rooms
    socket.on('new', () => {
      state.setSocket(socket.id, socket);
    })
  });
};
