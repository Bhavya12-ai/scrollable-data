import { calculateTotal } from './rewards'; 

describe('calculateTotal function', () => {

  test('should calculate points correctly when amount > 100', () => {
    const result = calculateTotal(120);
    expect(result).toBe(90);
  });

  test('should calculate points correctly when amount is between 50 and 100', () => {
    const result = calculateTotal(75);
    expect(result).toBe(25);
  });

  test('should return correct points for exactly 100', () => {
    const result = calculateTotal(100);
    expect(result).toBe(50);
  });

  test('should calculate points correctly for a whole number above 50', () => {
    const result = calculateTotal(90);
    expect(result).toBe(40);
  });

  test('should calculate points correctly for a fractional amount above 50', () => {
    const result = calculateTotal(75.5);
    expect(result).toBe(25.5);
  });

  test('should return 0 when amount is less than or equal to 50', () => {
    const result = calculateTotal(30);
    expect(result).toBe(0);
  });

  test('should handle negative amount gracefully', () => {
    const result = calculateTotal(-20);
    expect(result).toBe(0);
  });

  test('should handle non-number input safely', () => {
    const result = calculateTotal("abc");
    expect(result).toBe(0); 
  });

});


