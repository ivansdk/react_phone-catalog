import './Header.scss';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { Nav } from '../Nav/Nav';
import { Search } from '../Search/Search';
import { HeaderIcon } from '../HeaderIcon/HeaderIcon';
import { BurgerBtn } from '../BurgerBtn/BurgerBtn';
import React from 'react';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [activeSearch, setActiveSearch] = useState(false);

  return (
    <header className="header">
      <div className="header__right-bar">
        <div className="header__logo-wrapper">
          <Logo />
        </div>
        <Nav />
      </div>

      <div className="header__left-bar">
        {(pathname === '/phones' ||
          pathname === '/tablets' ||
          pathname === '/accessories' ||
          pathname === '/favorites') && (
          <Search
            activeSearch={activeSearch}
            setActiveSearch={setActiveSearch}
          />
        )}

        <HeaderIcon type="favorites" />
        <HeaderIcon type="cart" />
        {!activeSearch && <BurgerBtn />}
      </div>
    </header>
  );
};
