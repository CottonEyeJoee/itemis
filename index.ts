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

export function printReceipt(receipt: Receipt): string[] {
  const output: string[] = [];

  receipt.items.forEach((item) => {
    output.push(`${item.quantity} ${item.name}: ${item.price.toFixed(2)}`);
  });

  output.push(`Sales Taxes: ${receipt.tax.toFixed(2)}`);
  output.push(`Total: ${receipt.total.toFixed(2)}`);

  return output;
}

function readItemsFromFile(filePath: string = './items.json') {
  const file = Bun.file(filePath);
  return file.json();
}

const contents = await readItemsFromFile();

// Loop through each input in the contents
Object.keys(contents).forEach((key, index) => {
  const input = generateReceipt(contents[key]);
  const printedReceipt = printReceipt(input);

  console.log(`\nOutput ${index + 1}:`);
  console.log(printedReceipt.join('\n'));
});
