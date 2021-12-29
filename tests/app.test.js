const { expect } = require('chai');
const supertest = require('supertest');
const server = require('../server.js');
const request = supertest(server.app);

// control test
test('express responds properly', async () => {
    const response = await request
    .get('/test');
    expect(response.text).to.equal('test 123');
});

// run any tests that require express request and response objects
// execute controller tests
require('./controllers/join-test.js')(server.app);

// close server so jest dosen't hang
server.server.close();
