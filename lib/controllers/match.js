module.exports = (req, res, state, io) => {
  const status = state.play(req.body.player, req.body.spot);

  // notify room of match status on successful play
  if(!status.error)
    state.getSocket(state.getOtherPlayer(req.body.player)).emit('play', {status: status} );

  res.json(status);
}
