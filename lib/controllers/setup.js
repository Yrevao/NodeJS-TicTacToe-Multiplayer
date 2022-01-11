module.exports = (req, res, state, io) => {
  let status
  let strStatus = 'error';
  switch(req.body.type) {
    case 'ready':
      // toggle ready state and notify room that a player has readied
      status = state.ready(req.body.player);
      strStatus = (status.ready ? 'ready' : 'notready');
      state.getSocket(state.getOtherPlayer(req.body.player)).emit('setup', {type: req.body.type, status: strStatus});

      // attempt to start match, emit event on success
      if(state.start(req.body.player)) {
        io.to(state.getMatch(req.body.player)).emit('setup', {type: 'start'});
        strStatus = 'start';
      }
    break;
    case 'switch':
      // toggle first play then notify room what the first play is
      status = state.switch(req.body.player);
      strStatus = status;
      state.getSocket(state.getOtherPlayer(req.body.player)).emit('setup', {type: req.body.type, status: strStatus});
    break;
  }

  res.json({status: strStatus});
}
