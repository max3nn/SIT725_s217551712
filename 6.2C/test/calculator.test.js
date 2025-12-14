const expect = require('chai').expect;
const calculator = require('../utils/calculator');

describe('Calculator Tests', () => {
    // Valid behavior
    it('should return 5 when adding 2 and 3', () => {
        const result = calculator.add(2, 3);
        expect(result).to.equal(5);
    });

    // Edge case
    it('should handle adding negative numbers correctly', () => {
        const result = calculator.add(-2, -3);
        expect(result).to.equal(-5);
    });
});
