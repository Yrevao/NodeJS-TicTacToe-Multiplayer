module.exports = (req, res, state, io) => {
  const status = state.join(req.body.player, req.query.match);

  let strStatus = '';
  // set return status
  if(!status.error)
    if(status.count == 1)
      strStatus = 'host';
    else {
      strStatus = 'opponent';
      io.to(req.query.match).emit('full');
    }
  else
    strStatus = 'error';

  res.json({status: strStatus});
}
