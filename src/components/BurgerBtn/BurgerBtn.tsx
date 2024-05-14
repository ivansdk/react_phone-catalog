import { useContext } from 'react';
import './BurgerBtn.scss';
import { BurgerMenuContext } from '../../context/BurgerMenuContext';
import React from 'react';

export const BurgerBtn = () => {
  const { setActiveBurgerMenu } = useContext(BurgerMenuContext);

  return (
    <button
      type="button"
      aria-label="burger menu"
      className="burger"
      onClick={() => {
        setActiveBurgerMenu(true);
      }}
    >
      <div className="burger__icon" />
    </button>
  );
};
