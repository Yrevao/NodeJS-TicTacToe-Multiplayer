const { expect } = require('chai');
const request = require('supertest');

module.exports = (app) => {
  test('match plays in spot and return match state properly', async () => {
    const response = await request(app)
      .post('/match')
      .send({player: 'player-id-2', spot: 0});
    expect(response.body.board).to.deep.equal(['x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']);
  });
  test('player has to wait for their turn to play', async () => {
    const response = await request(app)
      .post('/match')
      .send({player: 'player-id-2', spot: 0});
    expect(response.body.error).to.equal(true);
  });
  test('second player can play', async () => {
    const response = await request(app)
      .post('/match')
      .send({player: 'player-id-1', spot: 1});
    expect(response.body.board).to.deep.equal(['x', 'o', ' ', ' ', ' ', ' ', ' ', ' ', ' ']);
  });
  test('player cannot play in taken spot', async () => {
    const response = await request(app)
      .post('/match')
      .send({player: 'player-id-2', spot: 1});
    expect(response.body.error).to.equal(true);
  });
}
