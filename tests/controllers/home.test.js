const { expect } = require('chai');
const httpMocks = require('node-mocks-http');
const home = require('../../lib/controllers/home');

const formatResponse = () => {
    return httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
}

test('testing how controller tests will work', () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/',
    });
    const response = formatResponse();

    response.on('end', () => {
      expect(response._getData()).to.equal("test 123");
    });

    home.init(request,response);
});
/*

*/
