import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { BackButton } from '../../components/BackButton/BackButton';
import './CartPage.scss';
import { Message } from '../../components/Message/Message';
import { Product } from '../../Types/Product';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import React from 'react';

export const CartPage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const { cartProducts, setCartProducts, cartProductsCount } =
    useContext(CartAndFavContext);

  const currentCarts: Product[] = products.filter(
    product => product.itemId in cartProducts,
  );

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const productId = e.currentTarget.dataset.id;

    if (productId !== undefined) {
      const { [productId]: removedProduct, ...restProducts } = cartProducts;

      setCartProducts(restProducts);
    }
  };

  const getOverallPrice = () => {
    let sum = 0;

    currentCarts.forEach(cart => {
      const price = cart.price * cartProducts[cart.itemId];

      sum += price;
    });

    return sum;
  };

  return (
    <>
      <BackButton />

      <div className="cart">
        <div className="title">Cart</div>

        {currentCarts.length === 0 ? (
          <Message messageText="There is no items in cart" />
        ) : (
          <div className="cart__wrapper">
            <div className="cart__products">
              {currentCarts.map(product => (
                <div key={product.id} className="cart__product">
                  <div className="left-bar">
                    <button
                      type="button"
                      aria-label="delete product"
                      data-id={product.itemId}
                      className="cart__close"
                      onClick={handleRemove}
                    >
                      X
                    </button>
                    <Link
                      className="cart__link"
                      to={`/${product.category}/${product.itemId}`}
                    >
                      <img
                        className="cart__img"
                        src={`${product.image}`}
                        alt=""
                      />
                      <div className="cart__name">{product.name}</div>
                    </Link>
                  </div>

                  <div className="right-bar">
                    <div className="cart__count count">
                      <button
                        type="button"
                        aria-label="minus count"
                        className={cn('count__btn count__minus', {
                          count__minus_disabled:
                            cartProducts[product.itemId] < 2,
                        })}
                        onClick={() => {
                          if (cartProducts[product.itemId] > 1) {
                            setCartProducts({
                              ...cartProducts,
                              [product.itemId]:
                                +cartProducts[product.itemId] - 1,
                            });
                          }
                        }}
                      >
                        -
                      </button>
                      <div className="count__number">
                        {cartProducts[product.itemId]}
                      </div>
                      <button
                        type="button"
                        aria-label="plus count"
                        className="count__btn count__plus"
                        onClick={() => {
                          setCartProducts({
                            ...cartProducts,
                            [product.itemId]: +cartProducts[product.itemId] + 1,
                          });
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart__price">
                      ${product.price * cartProducts[product.itemId]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout">
              <div className="checkout__price">${getOverallPrice()}</div>
              <div className="checkout__subtitle subtitle">
                {`Total for ${cartProductsCount} `}
                {cartProductsCount > 1 ? 'items' : 'item'}
              </div>
              <button type="button" className="checkout__btn">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
