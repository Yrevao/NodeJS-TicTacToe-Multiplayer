module.exports = (req, res, state, io) => {
  const status = state.play(req.body.player, req.body.spot);

  // notify room of match status on successful play
  if(!status.error)
    io.to(state.getMatch(req.body.player)).emit('play', {player: req.body.player, status: status} );

  res.json(status);
}
