import React from 'react';
import { BreadCrums } from '../../components/BreadCrums/BreadCrums';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { useLocation } from 'react-router-dom';

export const AccessoriesPage: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.slice(1, location.pathname.length);

  return (
    <>
      <BreadCrums />

      <ProductsList title="Accessories" category={category} />
    </>
  );
};
