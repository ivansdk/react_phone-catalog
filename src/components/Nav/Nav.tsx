import cn from 'classnames';

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { navigation } from '../../utils/navigation';
import './Nav.scss';
import { BurgerMenuContext } from '../../context/BurgerMenuContext';
import React from 'react';

type Props = {
  modal?: boolean;
};

export const Nav: React.FC<Props> = ({ modal = false }) => {
  const { setActiveBurgerMenu } = useContext(BurgerMenuContext);

  return (
    <nav className="nav" style={{ display: modal ? 'block' : '' }}>
      <ul
        className={cn('nav__list', {
          nav__list_vertical: modal,
        })}
      >
        {navigation.map(({ title, path }) => (
          <li
            key={title}
            className={cn('nav__item', {
              nav__item_center: modal,
            })}
          >
            <NavLink
              to={path}
              className={({ isActive }) =>
                cn('nav__link', {
                  'nav__link-active': isActive,
                  nav__link_big: modal,
                })
              }
              onClick={() => {
                if (modal) {
                  setActiveBurgerMenu(false);
                }
              }}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
