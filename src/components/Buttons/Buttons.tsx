import cn from 'classnames';

import './Buttons.scss';
import { useContext } from 'react';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import React from 'react';

type Props = {
  big?: boolean;
  productId: string;
};

export const Buttons: React.FC<Props> = ({ big = false, productId }) => {
  const {
    favoritesProducts,
    setFavoritesProducts,
    cartProducts,
    setCartProducts,
  } = useContext(CartAndFavContext);

  const HandleClick = (
    products: string[],
    setProducts: (value: string[]) => void,
  ) => {
    if (products.includes(productId)) {
      setProducts(products.filter(product => product !== productId));
    } else {
      setProducts([...products, productId]);
    }
  };

  const HandleCartClick = () => {
    if (productId in cartProducts) {
      const { [productId]: removedProduct, ...restProducts } = cartProducts;

      setCartProducts(restProducts);
    } else {
      setCartProducts({ ...cartProducts, [productId]: 1 });
    }
  };

  return (
    <div className="btns">
      {/* eslint-disable-next-line */}
      <button
        className={cn('btns__btn', {
          btns__btn_big: big,
          btns__btn_active: productId in cartProducts,
        })}
        onClick={HandleCartClick}
      >
        {productId in cartProducts ? 'Added to cart' : 'Add to cart'}
      </button>
      {/* eslint-disable-next-line */}
      <button
        className={cn('btns__favorites', {
          btns__favorites_big: big,
          btns__favorites_active: favoritesProducts.includes(productId),
        })}
        onClick={() => {
          HandleClick(favoritesProducts, setFavoritesProducts);
        }}
      ></button>
    </div>
  );
};
