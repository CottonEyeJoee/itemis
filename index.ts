import { Item, ReceiptItem, Receipt } from './types';

const BASIC_SALES_TAX_RATE = 0.1; // 10%
const IMPORT_DUTY_RATE = 0.05; // 5%

export function calculateSalesTax(
  price: number,
  isExempt: boolean,
  isImported: boolean,
): number {
  let tax = 0;

  if (!isExempt) {
    tax += price * BASIC_SALES_TAX_RATE;
  }

  if (isImported) {
    tax += price * IMPORT_DUTY_RATE;
  }

  return roundUp(tax);
}

export function roundUp(number: number): number {
  return Math.ceil(number * 20) / 20;
}

export function generateReceipt(items: Item[]): Receipt {
  let totalTax = 0;
  let totalPrice = 0;

  const receiptItems: ReceiptItem[] = items.map((item) => {
    const itemTax = calculateSalesTax(
      item.price,
      item.isExempt,
      item.isImported,
    );
    const itemTotalPrice = item.price + itemTax;

    totalTax += itemTax;
    totalPrice += itemTotalPrice;

    return {
      quantity: 1, // For simplicity, assuming quantity is always 1. This can be modified if needed.
      name: item.name,
      price: itemTotalPrice,
    };
  });

  return {
    items: receiptItems,
    tax: totalTax,
    total: totalPrice,
  };
}

