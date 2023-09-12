import { describe, expect, test } from 'bun:test';
import {
  calculateSalesTax,
  roundUp,
  generateReceipt,
  printReceipt,
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
  test('should round up to the nearest 0.05', () => {
    expect(roundUp(0.01)).toBe(0.05);
    expect(roundUp(0.06)).toBe(0.1);
    expect(roundUp(0.101)).toBe(0.15);
  });
  test('should return the same value if already a multiple of 0.05', () => {
    expect(roundUp(0.05)).toBe(0.05);
    expect(roundUp(0.1)).toBe(0.1);
  });
});

describe('generateReceipt', () => {
  test('should generate a correct receipt for a mix of items', () => {
    const items = [
      { name: 'book', price: 12.49, isExempt: true, isImported: false },
      { name: 'music CD', price: 14.99, isExempt: false, isImported: false },
      {
        name: 'imported chocolate',
        price: 10.0,
        isExempt: true,
        isImported: true,
      },
    ];

    const receipt = generateReceipt(items);

    expect(receipt.items).toHaveLength(3);
    expect(receipt.tax).toBeCloseTo(1.5 + 0.5); // 1.5 for music CD and 0.5 for imported chocolate
    expect(receipt.total).toBeCloseTo(12.49 + 16.49 + 10.5); // Prices including tax
  });
});

describe('printReceipt', () => {
  test('should print the receipt in the correct format', () => {
    const receipt = {
      items: [
        { quantity: 1, name: 'book', price: 12.49 },
        { quantity: 1, name: 'music CD', price: 16.49 },
      ],
      tax: 1.5,
      total: 28.98,
    };

    const printed = printReceipt(receipt);

    expect(printed).toEqual([
      '1 book: 12.49',
      '1 music CD: 16.49',
      'Sales Taxes: 1.50',
      'Total: 28.98',
    ]);
  });
});
