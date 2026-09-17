export type Product = {
  id: number;
  name: string;
  price: number;
  picture: string;
};
export type BasketItem = Product & { quantity: number };
