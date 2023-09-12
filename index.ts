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

