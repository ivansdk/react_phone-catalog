import { useContext, useEffect, useMemo, useState } from 'react';
import { BannerSlider } from '../../components/Banner/BannerSlider';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { ProductContext } from '../../context/ProductContext';
import React from 'react';

const imgForBanner = [
  './img/banner-phones.png',
  './img/banner-tablets.png',
  './img/banner-accessories.png',
];

type ProductsCounts = {
  phones: number;
  tablets: number;
  accessories: number;
};

export const HomePage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const [productsCounts, setProductsCounts] = useState<ProductsCounts>({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    if (products.length > 0) {
      setProductsCounts({
        phones: products.filter(product => product.category === 'phones')
          .length,
        tablets: products.filter(product => product.category === 'tablets')
          .length,
        accessories: products.filter(
          product => product.category === 'accessories',
        ).length,
      });
    }
  }, [products]);

  const hotPrices = useMemo(() => {
    return [...products].sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });
  }, [products]);

  const brandNewModel = useMemo(() => {
    return [...products].filter(phone => {
      return phone.year === 2019;
    });
  }, [products]);

  return (
    <>
      <BannerSlider images={imgForBanner} animationDuration={1000} />

      <ProductSlider
        products={hotPrices}
        title="Hot prices"
        animationDuration={500}
      />

      <ShopByCategory
        ItemsCount={{
          phonesCount: productsCounts.phones,
          tabletCount: productsCounts.tablets,
          accessoriesCount: productsCounts.accessories,
        }}
      />

      <ProductSlider
        products={brandNewModel}
        title="Brand new models"
        animationDuration={500}
      />
    </>
  );
};
