import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ProductContextProvider } from './context/ProductContext';
import { BurgerMenu } from './components/BurgerMenu/BurgerMenu';
import { BurgerMenuContextProvider } from './context/BurgerMenuContext';
import { CartAndFavContextProvider } from './context/CartAndFavContext';
import { WindowWidthContextProvider } from './context/WindowWidthContext';
import React from 'react';

export const Root: React.FC = () => {
  return (
    <ProductContextProvider>
      <BurgerMenuContextProvider>
        <CartAndFavContextProvider>
          <WindowWidthContextProvider>
            <div className="wrapper">
              <Header />

              <div className="main">
                <div className="container">
                  <Outlet />
                </div>
              </div>

              <Footer />

              <BurgerMenu />
            </div>
          </WindowWidthContextProvider>
        </CartAndFavContextProvider>
      </BurgerMenuContextProvider>
    </ProductContextProvider>
  );
};
