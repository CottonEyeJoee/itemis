import { describe, expect, test } from 'bun:test';
import {
  calculateSalesTax,
  roundUp,
} from './index';

describe('calculateSalesTax', () => {
  test('should return 0 for an exempt and non-imported item', () => {
    expect(calculateSalesTax(10, true, false)).toBe(0);
  });
  test('should return 10% tax for a non-exempt and non-imported item', () => {
      expect(calculateSalesTax(10, false, false)).toBe(1); // 10% of 10
  });
  test('should return 5% tax for an exempt and imported item', () => {
    expect(calculateSalesTax(10, true, true)).toBe(0.5); // 5% of 10
  });
  test('should return 15% tax for a non-exempt and imported item', () => {
    expect(calculateSalesTax(10, false, true)).toBe(1.5); // 10% + 5% of 10
  });
});

describe('roundUp', () => {
  test.todo('should round up to the nearest 0.05', () => {
    expect(roundUp(0.01)).toBe(0.05);
    expect(roundUp(0.06)).toBe(0.1);
    expect(roundUp(0.101)).toBe(0.15);
  });
  test.todo(
    'should return the same value if already a multiple of 0.05',
    () => {
      expect(roundUp(0.05)).toBe(0.05);
      expect(roundUp(0.1)).toBe(0.1);
    },
  );
});

