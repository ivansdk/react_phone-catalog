import { ProductsList } from '../../components/ProductsList/ProductsList';
import { BreadCrums } from '../../components/BreadCrums/BreadCrums';
import { useLocation } from 'react-router-dom';
import React from 'react';

export const PhonePage: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.slice(1, location.pathname.length);

  return (
    <>
      <BreadCrums />

      <ProductsList title="Mobie phones" category={category} />
    </>
  );
};
