import React from 'react';
import './BreadCrums.scss';
import { Link, useLocation } from 'react-router-dom';

export const BreadCrums: React.FC = () => {
  const { pathname } = useLocation();
  const paths = pathname.split('/').slice(1);

  return (
    <ul className="breadcrums">
      <li className="breadcrums__element breadcrums__home">
        <Link to="/" />
      </li>
      {paths.map(path => (
        <li key={path} className="breadcrums__element">
          <span className="breadcrums__arrow" />
          <Link to={`/${path}`} className="breadcrums__text">
            {path}
          </Link>
        </li>
      ))}
    </ul>
  );
};
