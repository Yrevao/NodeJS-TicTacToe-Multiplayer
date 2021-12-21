const { expect } = require('chai');
const state = require('../lib/state.js');

describe('test server-side state', () => {
  test('state can associate player with match', () => {
    // join requests
    expect(state.join('player-ID-1', 'match-ID').count).to.equal(1);        // player id joins match id
    expect(state.join('player-ID-1', 'match-ID').error).to.equal(true);     // same player id cant join twice
    expect(state.join('player-ID-2', 'match-ID').count).to.equal(2);        // two players can join a match
    expect(state.join('player-ID-3', 'match-ID').error).to.equal(true);     // three players cannot join a match
  });
  test('state can setup match', () => {
    // setup requests
    expect(state.ready('player-ID-1')).to.equal(false);                     // player readys up, returns true when both players in match are ready
    expect(state.switch('player-ID-1')).to.equal('o');                      // host being the first player to join a match will be able to swtich if they go first or not; returns x or o based on if they are going first or not respectivly, returns e on error (playerid isnt host etc)
    expect(state.start('player-ID-1')).to.equal(false);                     // returns true when match starts successfully
    expect(state.ready('player-ID-2')).to.equal(true);                      // both players are ready
    expect(state.start('player-ID-1')).to.equal(true);                      // match starts
  });
  test('state can advance match', () => {
    // match requests
    expect(state.play('player-ID', 4).error).to.equal(true);                // error because playerID never joined
  });
  test('state pruning works', () => {
    expect(state.join('player-ID-1', 'match-ID').error).to.equal(true);     // player id joins match id
    expect(state.prune('player-ID-1')).to.equal(true);                      // player-ID-1 was deleted successfully
    expect(state.join('player-ID-1', 'match-ID').error).to.equal(false);    // player was deleted but now is readded to state
    expect(state.prune('player-ID')).to.equal(false);                       // player-ID dosent exist in the state
  });
});
