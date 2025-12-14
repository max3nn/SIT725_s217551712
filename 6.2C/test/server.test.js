const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server');

describe('API Tests', () => {
    // Valid behavior
    it('should return 200 and the correct sum for valid numbers', (done) => {
        request(app)
            .get('/add?num1=5&num2=10')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.result).to.equal(15);
                done();
            });
    });

    // Invalid/error behavior
    it('should return 400 if parameters are missing or invalid', (done) => {
        request(app)
            .get('/add?num1=abc&num2=10')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.error).to.exist;
                done();
            });
    });
});
