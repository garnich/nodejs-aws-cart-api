export enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};

export type CartItem = {
  product: Product,
  count: number,
}
