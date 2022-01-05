module.exports = (req, res, state, io) => {
  let status
  let strStatus = 'error';
  switch(req.body.type) {
    case 'ready':
      status = state.ready(req.body.player);
      strStatus = (status.ready ? 'ready' : 'notready');
      io.to(state.getMatch(req.body.player)).emit('setup', {type: req.body.type, player: req.body.player, status: strStatus});
    break;
    case 'switch':
      status = state.switch(req.body.player);
      strStatus = status;
      io.to(state.getMatch(req.body.player)).emit('setup', {type: req.body.type, player: req.body.player, status: strStatus});
    break;
  }

  res.json({status: strStatus});
}
