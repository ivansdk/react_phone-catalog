import cn from 'classnames';

import { useContext, useEffect, useState } from 'react';
import './ProductSlider.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Loader } from '../Loader/Loader';
import { Product } from '../../Types/Product';
import { ProductContext } from '../../context/ProductContext';
import { Message } from '../Message/Message';
import { WindowWidthContext } from '../../context/WindowWidthContext';
import React from 'react';

type Props = {
  products: Product[];
  title: string;
  animationDuration: number;
};

export const ProductSlider: React.FC<Props> = ({
  products,
  title,
  animationDuration,
}) => {
  const { windowWidth } = useContext(WindowWidthContext);
  const { loader, erroMessage } = useContext(ProductContext);
  const [slideId, setSlideId] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [perItems, setPerItems] = useState(4);

  const firstSlideId = 0;
  const lastSlideId = products.length - 4;

  useEffect(() => {
    if (windowWidth < 770) {
      setPerItems(1);
    } else if (windowWidth < 940) {
      setPerItems(2);
    } else if (windowWidth < 1200) {
      setPerItems(3);
    } else {
      setPerItems(4);
    }
  }, [windowWidth]);

  const handleClick = (step: number) => {
    const currentId = slideId + step;

    setSlideId(currentId);
  };

  const handelTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEnd = event.changedTouches[0].clientX;
    const swipeX = touchStart - touchEnd;

    if (swipeX > 70 && !(slideId === lastSlideId)) {
      handleClick(1);
    } else if (swipeX < -70 && !(slideId === firstSlideId)) {
      handleClick(-1);
    }
  };

  return (
    <section className="slider">
      <div className="slider__top">
        <span className="slider__title title">{title}</span>
        <div className="slider__buttons">
          <button
            type="button"
            aria-label="left arrow"
            className={cn('slider__btn slider__btn_left', {
              slider__btn_left_disabled:
                slideId === firstSlideId || loader || erroMessage,
            })}
            onClick={() => {
              if (!(slideId === firstSlideId || loader || erroMessage)) {
                handleClick(-1);
              }
            }}
          />
          <button
            type="button"
            aria-label="right arrow"
            className={cn('slider__btn slider__btn_right', {
              slider__btn_right_disabled:
                slideId === lastSlideId || loader || erroMessage,
            })}
            onClick={() => {
              if (!(slideId === lastSlideId || loader || erroMessage)) {
                handleClick(1);
              }
            }}
          />
        </div>
      </div>

      <div className="slider__container" style={{ width: perItems * 288 }}>
        {!loader && erroMessage ? (
          <Message messageText={erroMessage} />
        ) : (
          <div
            className="slider__list"
            style={{
              transform: `translateX(${-(slideId * 288)}px)`,
              transition: `all ${animationDuration / 1000}s ease`,
            }}
            onTouchStart={event => {
              setTouchStart(event.changedTouches[0].clientX);
            }}
            onTouchEnd={handelTouchEnd}
          >
            {loader && !erroMessage ? (
              <Loader />
            ) : (
              products.map(product => (
                <ProductCard
                  key={product.itemId}
                  id={product.itemId}
                  path={`/${product.category}/${product.itemId}`}
                  image={`${product.image}`}
                  title={product.name}
                  price={product.price}
                  oldPrice={product.fullPrice}
                  screen={product.screen}
                  capacity={product.capacity}
                  ram={product.ram}
                />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};
