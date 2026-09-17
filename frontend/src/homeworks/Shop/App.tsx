import { useState } from "react";
import { ProductList } from "./components/ProductList";
import { Basket } from "./components/Basket";
import type { Product, BasketItem } from "./helpers/types";

const products: Product[] = [
  { id: 1, name: "Headphones", price: 59, picture: "https://www.kroger.com/product/images/xlarge/front/0081006114507" },
  { id: 2, name: "Keyboard", price: 45, picture: "https://dlcdnwebimgs.asus.com/gain/438c9a2e-ba2a-45e6-a6aa-6cb9db7581fb/" },
  { id: 3, name: "Mouse", price: 25, picture: "https://notebookcentre.am/storage/products/thumbnail/copy-7135ef35-0264-44d6-b5f0-ed34992a6d0b.webp" },
  { id: 4, name: "Monitor", price: 199, picture: "https://www.v7world.com/media/catalog/product/cache/3ea0d44432af00a56ff77246dbc088d6/L/2/L270IPS_HAS_Front_af9b.png" },
  { id: 5, name: "Headphones", price: 60, picture: "https://m.media-amazon.com/images/I/610ub5kytVL.jpg" },
  { id: 6, name: "Keyboard", price: 50, picture: "https://static.cytron.io/image/original/catalog/products/CA-WKMC-RB/keyboard--mouse-e.png" },
  { id: 7, name: "Mouse", price: 30, picture: "https://cdn.sandberg.world/products/images/lg/640-27_lg.jpg" },
  { id: 8, name: "Monitor", price: 200, picture: "https://data.it-markt.ch/styles/np8_full/s3/media/2024/01/23/24e1n1300a_ftl.png?itok=uzzDkcnx" },
];

function Shop() {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const handleMove = (product: Product) => {
    setBasket((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleIncrease = (id: number) => {
    setBasket((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecrease = (id: number) => {
    setBasket((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id: number) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <ProductList products={products} onMove={handleMove} />
      <Basket
        items={basket}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
      />
    </div>
  );
}

export default Shop;
