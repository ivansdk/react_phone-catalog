import React from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <>
      <BackButton />
      <div className="page-err">
        <div className="page-err__title title">Page not found</div>
        <img className="page-err__img" src="./img/page-not-found.png" alt="" />
      </div>
    </>
  );
};
