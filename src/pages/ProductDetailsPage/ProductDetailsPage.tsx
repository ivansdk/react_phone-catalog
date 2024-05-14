import cn from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';

import { useState, useEffect, useContext } from 'react';
import { BreadCrums } from '../../components/BreadCrums/BreadCrums';
import './ProductDetailsPage.scss';
import { BackButton } from '../../components/BackButton/BackButton';
import { Prices } from '../../components/Prices/Prices';
import { Buttons } from '../../components/Buttons/Buttons';
import { Table } from '../../components/Table/Table';
import { Loader } from '../../components/Loader/Loader';
import { ProductDetails } from '../../Types/ProductDetails';
import { Message } from '../../components/Message/Message';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Product } from '../../Types/Product';
import { getProductDetailsById } from '../../helpers/api';
import { ProductContext } from '../../context/ProductContext';
import React from 'react';

const availableColors = {
  black: '#333333',
  gold: '#FFD983',
  yellow: '#FFFF00',
  green: '#008000',
  midnightgreen: '#4B5320',
  silver: '#C0C0C0',
  spacegray: '#708090',
  red: '#FF6347',
  white: '#FFFFFF',
  purple: '#9370DB',
  coral: '#FF6F61',
  rosegold: '#B76E79',
  'rose gold': '#B76E79',
  midnight: '#191970',
  spaceblack: '#2F4F4F',
  blue: '#87CEEB',
  pink: '#FFC0CB',
  sierrablue: '#5D8AA8',
  graphite: '#383838',
  'space gray': '#708090',
  'sky blue': '#87CEEB',
  starlight: '#E2E2E2',
};

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const { products } = useContext(ProductContext);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [currentImgId, setCurrentImgId] = useState(0);
  const { pathname } = useLocation();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setError(false);
    setCurrentImgId(0);

    getProductDetailsById(productId)
      .then(setProduct)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [pathname]);

  const getProductId = () => {
    const current = products.find(prod => prod.itemId === product?.id);

    return current?.id;
  };

  const getSuggestedProducts = () => {
    const min = 0;
    const max = products.length - 1;

    let startIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    let endIndex = Math.floor(
      Math.random() * (max - (startIndex + 4) + 1) + (startIndex + 4),
    );

    if (startIndex < 0) {
      startIndex = 0;
    }

    if (endIndex < 0) {
      endIndex = 4;
    }

    if (startIndex >= endIndex) {
      startIndex = endIndex - 4;
    }

    const suggestedProds = products.slice(startIndex, endIndex);

    return suggestedProds;
  };

  useEffect(() => {
    if (products.length > 0) {
      setSuggestedProducts(getSuggestedProducts());
    }
  }, [product]);

  return (
    <>
      {!loader && error && (
        <>
          <BackButton />
          <img src="" alt="" />
          <Message messageText="Product is not found" />
        </>
      )}

      {loader && <Loader />}

      {!loader && product !== null && !error && (
        <>
          <BreadCrums />

          <BackButton />

          <div className="item">
            <div className="item__title title">{product?.name}</div>
            <div className="item__wrapper">
              <div className="item__images">
                <div className="item__tabs">
                  {product?.images.map((image, index) => (
                    <button
                      type="button"
                      aria-label="image button"
                      onClick={() => {
                        setCurrentImgId(index);
                      }}
                      key={image}
                      className={cn('item__img', {
                        item__img_active: index === currentImgId,
                      })}
                    >
                      <img src={`${image}`} alt={image} />
                    </button>
                  ))}
                </div>
                <div className="item__main-img">
                  <img src={`${product?.images[currentImgId]}`} alt="" />
                </div>
              </div>

              <div className="item__info">
                <div className="item__colors-wrapper">
                  <span className="subtitle">Avaible colors</span>
                  <ul className="list">
                    {product?.colorsAvailable.map(color => (
                      <li key={color} className="item__color">
                        <Link
                          to={pathname.replace(
                            product.color.replace(' ', '-'),
                            color.replace(' ', '-'),
                          )}
                          className={cn('item__color-link', {
                            'item__color-link_active': color === product.color,
                          })}
                        >
                          <span
                            style={{
                              background:
                                availableColors[
                                  color as keyof typeof availableColors
                                ],
                            }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="item__capacity-wrapper">
                  <span className="subtitle">Select capacity</span>
                  <ul className="list">
                    {product?.capacityAvailable.map(capacity => (
                      <li
                        key={capacity}
                        className={cn('item__capacity', {
                          item__capacity_active: capacity === product.capacity,
                        })}
                      >
                        <Link
                          to={pathname.replace(
                            product.capacity.toLocaleLowerCase(),
                            capacity.toLocaleLowerCase(),
                          )}
                          className="item__capacity-link"
                        >
                          {capacity}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Prices
                  currentPrice={product?.priceDiscount}
                  oldPrice={product?.priceRegular}
                  big
                />

                <Buttons productId={product?.id} big />

                <Table
                  tableItems={[
                    ['Screen', product.screen],
                    ['Resoluton', product.resolution],
                    ['Processor', product.processor],
                    ['RAM', product.ram],
                  ]}
                />
              </div>

              <div className="item__id">
                ID:
                {getProductId()}
              </div>
            </div>

            <div className="descrition">
              <div className="descr">
                <div className="descrition__title">About</div>

                {product?.description.map(descr => (
                  <div key={descr.title}>
                    <div className="descr__subtitle">{descr.title}</div>
                    <div className="descr__text">{descr.text}</div>
                  </div>
                ))}
              </div>

              <div className="specs">
                <div className="descrition__title">Tech specs</div>

                <Table
                  tableItems={[
                    ['Screen', product.screen],
                    ['Resoluton', product.resolution],
                    ['Processor', product.processor],
                    ['RAM', product.ram],
                    ['Build in memory', product.capacity],
                    ['Camera', product.camera],
                    ['Zoom', product.zoom],
                    ['Cell', product.cell.join(', ')],
                  ]}
                  big
                />
              </div>
            </div>
            <ProductSlider
              title="You may also like"
              products={suggestedProducts}
              animationDuration={500}
            />
          </div>
        </>
      )}
    </>
  );
};
