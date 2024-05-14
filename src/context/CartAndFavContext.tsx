import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type Prod = {
  [key: string]: number;
};

interface ContextType {
  favoritesProducts: string[];
  setFavoritesProducts: (value: string[]) => void;
  cartProducts: Prod;
  setCartProducts: (value: Prod) => void;
  cartProductsCount: number;
}

export const CartAndFavContext = createContext<ContextType>({
  favoritesProducts: [],
  setFavoritesProducts: () => {},
  cartProducts: {},
  setCartProducts: () => {},
  cartProductsCount: 0,
});

type Props = {
  children: React.ReactNode;
};

export const CartAndFavContextProvider: React.FC<Props> = ({ children }) => {
  const [favoritesProducts, setFavoritesProducts] = useLocalStorage<string[]>(
    'favorites',
    [],
  );
  const [cartProducts, setCartProducts] = useLocalStorage<Prod>('cart', {});
  const cartProductsCount = useMemo(() => {
    return Object.values(cartProducts).reduce((acc, item) => acc + item, 0);
  }, [cartProducts]);

  return (
    <CartAndFavContext.Provider
      value={{
        favoritesProducts,
        setFavoritesProducts,
        cartProducts,
        setCartProducts,
        cartProductsCount,
      }}
    >
      {children}
    </CartAndFavContext.Provider>
  );
};
