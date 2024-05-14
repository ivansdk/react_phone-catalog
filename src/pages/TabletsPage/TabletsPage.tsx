import { useLocation } from 'react-router-dom';
import { BreadCrums } from '../../components/BreadCrums/BreadCrums';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import React from 'react';

export const TabletsPage: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.slice(1, location.pathname.length);

  return (
    <>
      <BreadCrums />

      <ProductsList title="Tablets" category={category} />
    </>
  );
};
