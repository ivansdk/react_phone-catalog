import React, { createContext, useState, useEffect } from 'react';
import { getProducts } from '../helpers/api';
import { Product } from '../Types/Product';

interface ContextType {
  products: Product[];
  loader: boolean;
  erroMessage: string;
}

export const ProductContext = createContext<ContextType>({
  products: [],
  loader: false,
  erroMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const ProductContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [erroMessage, setErroMessage] = useState<string>('');

  useEffect(() => {
    setLoader(true);
    getProducts()
      .then(prod => setProducts(prod as Product[]))
      .catch(() => setErroMessage('Something went wrong'))
      .finally(() => setLoader(false));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loader,
        erroMessage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
