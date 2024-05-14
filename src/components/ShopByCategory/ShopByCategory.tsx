import { Link } from 'react-router-dom';
import './ShopByCategory.scss';
import React from 'react';

type Props = {
  ItemsCount: {
    phonesCount: number;
    tabletCount: number;
    accessoriesCount: number;
  };
};

export const ShopByCategory: React.FC<Props> = ({ ItemsCount }) => {
  return (
    <section className="categories">
      <div className="categories__title title">Shop by category</div>
      <div className="categories__wrapper">
        <Link to="/phones" className="categories__item">
          <div className="categories__img categories__img-phones" />
          <span className="categories__name">Mobile phones</span>
          <span className="categories__count subtitle">
            {ItemsCount.phonesCount} models
          </span>
        </Link>
        <Link to="/tablets" className="categories__item">
          <div className="categories__img categories__img-tablets" />
          <span className="categories__name">Tablets</span>
          <span className="categories__count subtitle">
            {ItemsCount.tabletCount} models
          </span>
        </Link>
        <Link to="/accessories" className="categories__item">
          <div className="categories__img categories__img-accessories" />
          <span className="categories__name">Accessories</span>
          <span className="categories__count subtitle">
            {ItemsCount.accessoriesCount} models
          </span>
        </Link>
      </div>
    </section>
  );
};
