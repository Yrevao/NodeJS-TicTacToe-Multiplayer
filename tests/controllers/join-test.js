const { expect } = require('chai');
const request = require('supertest');

module.exports = (app) => {
  test('/join; api identifies empty match where player is host', async () => {
    const response = await request(app)
      .post('/join')
      .query({match: 'match-id-1'})
      .send({player: 'player-id-1'});
    expect(response.body.status).to.equal('host');
  });
  test('/join; api identifies joined match where player is opponent', async () => {
    const response = await request(app)
      .post('/join')
      .query({match: 'match-id-1'})
      .send({player: 'player-id-2'})
    expect(response.body.status).to.equal('opponent');
  });
  test('/join; api identifies match join error state on full match', async () => {
    const response = await request(app)
      .post('/join')
      .query({match: 'match-id-1'})
      .send({player: 'player-id-3'})
    expect(response.body.status).to.equal('error');
  });
}
