import { Product } from '../Types/Product';
import { ProductDetails } from '../Types/ProductDetails';

const request = async <T>(url: string): Promise<T> => {
  const res = await fetch(
    `https://ivansdk.github.io/react_phone-catalog/api/${url}`,
  );

  return res.json();
};

export const getProducts = () => request<Product[]>('products.json');

export const getProductsByCategory = async (category: string) => {
  const products = await request<Product[]>('products.json');

  return products.filter(product => product.category === category);
};

export const getProductDetailsById = async (itemId: string) => {
  const products = await request<Product[]>('products.json');

  const product = products.filter(prod => prod.itemId === itemId)[0];

  const category = await request<ProductDetails[]>(`${product.category}.json`);

  return category.filter(item => item.id === itemId)[0];
};
