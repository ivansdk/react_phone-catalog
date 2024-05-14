import cn from 'classnames';

import { useContext } from 'react';
import { HeaderIcon } from '../HeaderIcon/HeaderIcon';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';
import './BurgerMenu.scss';
import { BurgerMenuContext } from '../../context/BurgerMenuContext';
import React from 'react';

export const BurgerMenu = () => {
  const { activeBurgerMenu, setActiveBurgerMenu } =
    useContext(BurgerMenuContext);

  return (
    <div
      className={cn('menu', {
        menu_active: activeBurgerMenu,
      })}
    >
      <div className="menu-top">
        <Logo />
        <button
          type="button"
          aria-label="burger menu close"
          className="menu__close"
          onClick={() => setActiveBurgerMenu(false)}
        >
          X
        </button>
      </div>

      <div className="menu__wrapper">
        <Nav modal={true} />

        <div className="menu__icons">
          <HeaderIcon type="favorites" modal={true} witoutShadow />
          <HeaderIcon type="cart" modal={true} witoutShadow />
        </div>
      </div>
    </div>
  );
};
