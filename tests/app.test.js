const { expect } = require('chai');
const request = require('supertest');
const httpMocks = require('node-mocks-http');
const app = require('../app.js');

test('express responds properly', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).to.equal(200);
});
