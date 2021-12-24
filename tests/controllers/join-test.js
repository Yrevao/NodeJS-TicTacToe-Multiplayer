const { expect } = require('chai');
const request = require('supertest');

module.exports = (app) => {
  test('join route responds correctly', async () => {
    const response = await request(app)
      .post('/join')
      .query({match: 'match-id-1'})
      .send({player: 'player-id-1'});
    expect(response.body.a).to.equal('player-id-1');
  });
}
