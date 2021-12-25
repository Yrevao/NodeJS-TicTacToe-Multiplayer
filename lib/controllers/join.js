module.exports = (req, res, state) => {
  const status = state.join(req.body.player, req.query.match);

  let strStatus = '';
  if(status.error) strStatus = 'error';
  else if(status.count == 1) strStatus = 'host';
  else if(status.count == 2) strStatus = 'opponent';

  res.json({status: strStatus});
}
