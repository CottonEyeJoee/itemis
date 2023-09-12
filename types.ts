export type Item = {
  name: string;
  price: number;
  isExempt: boolean;
  isImported: boolean;
};

export type ReceiptItem = {
  quantity: number;
  name: string;
  price: number;
};

export type Receipt = {
  items: ReceiptItem[];
  tax: number;
  total: number;
};
