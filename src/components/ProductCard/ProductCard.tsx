import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { Prices } from '../Prices/Prices';
import { Buttons } from '../Buttons/Buttons';
import { Table } from '../Table/Table';
import React from 'react';

type Props = {
  id: string;
  path: string;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  screen: string;
  capacity: string;
  ram: string;
};

export const ProductCard: React.FC<Props> = ({
  id,
  path,
  image,
  title,
  price,
  oldPrice,
  screen,
  capacity,
  ram,
}) => {
  return (
    <div className="product">
      <Link
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
        to={path}
      >
        <img src={image} alt={title} className="product__img" />

        <div className="product__title">{title}</div>

        <Prices currentPrice={price} oldPrice={oldPrice} />

        <Table
          tableItems={[
            ['Screen', screen],
            ['Capacity', capacity],
            ['RAM', ram],
          ]}
        />
      </Link>

      <Buttons productId={id} />
    </div>
  );
};
