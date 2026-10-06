import { divide } from '../src/calculator.js';

describe('divide', () => {

    it('divides two positive numbers', () => {
        expect(divide(10, 2)).toBe(5);
    });

    it('throws TypeError when first argument is not a number', () => {
        expect(() => divide("10", 2)).toThrow(TypeError);
    });

    it('throws TypeError when second argument is not a number', () => {
        expect(() => divide(10, "2")).toThrow(TypeError);
    });

    it("throws TypeError when an argument is NaN", () => {
        expect(() => divide(NaN, 2)).toThrow(TypeError);
    });

    it("throws RangeError when divided by zero", () => {
        expect(() => divide(10, 0)).toThrow(RangeError);
    });

});