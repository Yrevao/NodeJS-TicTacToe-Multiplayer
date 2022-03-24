const { expect } = require('chai');
const request = require('supertest');

module.exports = (app) => {
  test('setup returns ready on successful ready', async () => {
    const response = await request(app)
      .post('/setup')
      .send({type: 'ready', player: 'player-id-1'});
    expect(response.body.status).to.equal('ready'); // ready, notready, or false on error
  });
  test('setup returns ready on successful player 2 ready', async () => {
    const response = await request(app)
      .post('/setup')
      .send({type: 'ready', player: 'player-id-2'});
    expect(response.body.status).to.equal('start'); // ready, notready, or false on error
  });
  test('setup returns notready on successful unready', async () => {
    const response = await request(app)
      .post('/setup')
      .send({type: 'ready', player: 'player-id-1'});
    expect(response.body.status).to.equal('notready'); // ready, notready, or error on error
  });
  test('setup returns current first play on successful first play toggle', async () => {
    const response = await request(app)
      .post('/setup')
      .send({type: 'switch', player: 'player-id-1'})
    expect(response.body.status).to.equal('o'); // first, second, or error on error
  });
}
