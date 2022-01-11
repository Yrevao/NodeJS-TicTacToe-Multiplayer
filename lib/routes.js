var path = require('path');
const express = require('express');

// controllers
const join = require('./controllers/join');
const setup = require('./controllers/setup');
const match = require('./controllers/match');



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
    join(req, res, state, io);
  });

  // used for ready and go first buttons
  app.post('/setup', (req, res) => {
    setup(req, res, state, io);
  });

  // allows players to make plays in the game state
  app.post('/match', (req, res) => {
    match(req, res, state, io);
  });

  // io routes
  io.on('connection', (socket) => {
    console.log(`Connected ID: ${socket.id}`);

    // clean client from state on disconnect
    socket.on('disconnect', () => {
      // notify remaining client and remove disconnected client from state
      io.to(state.getMatch(socket.id)).emit('leave');
      state.prune(socket.id);

      console.log(`Disconnected ID: ${socket.id}`);
    });

    // associate playerID (socket.id) with that id's socket and add socket to room for match
    socket.on('joinRoom', () => {
      state.setSocket(socket.id, socket);
      socket.join(state.getMatch(socket.id));
    });
  });
};
