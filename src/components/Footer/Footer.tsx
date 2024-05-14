import './Footer.scss';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { footer } from '../../utils/footer';
import { BackToTop } from '../BackToTop/BackToTop';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Logo />

        <ul className="footer__nav nav">
          {footer.map(({ title, path }) => (
            <li key={title} className="nav__item footer-nav__item">
              <NavLink to={path} className="nav__link">
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        <BackToTop />
      </div>
    </footer>
  );
};
