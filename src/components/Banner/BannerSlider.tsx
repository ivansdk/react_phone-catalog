import cn from 'classnames';

import { useState } from 'react';
import './BannerSlider.scss';
import React from 'react';

type Props = {
  images: string[];
  animationDuration: number;
};

export const BannerSlider: React.FC<Props> = ({
  images,
  animationDuration,
}) => {
  const [slideId, setSlideId] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const firstSlideId = 0;
  const lastSlideId = images.length - 1;

  const handleClick = (step: number) => {
    let currentId = slideId + step;

    if (currentId < firstSlideId) {
      currentId = lastSlideId;
    } else if (currentId > lastSlideId) {
      currentId = firstSlideId;
    }

    setSlideId(currentId);
  };

  const handelTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEnd = event.changedTouches[0].clientX;
    const swipeX = touchStart - touchEnd;

    if (swipeX > 70) {
      handleClick(1);
    } else if (swipeX < -70) {
      handleClick(-1);
    }
  };

  return (
    <section className="banner-slider">
      <button
        type="button"
        aria-label="arrow left"
        className="banner-slider__btn banner-slider__btn_left"
        onClick={() => {
          handleClick(-1);
        }}
      />

      <div className="banner-slider__container">
        <div
          className="banner-slider__list"
          style={{
            transform: `translateX(${-(slideId * 100)}%)`,
            transition: `all ${animationDuration / 1000}s ease`,
          }}
          onTouchStart={event => {
            setTouchStart(event.changedTouches[0].clientX);
          }}
          onTouchEnd={handelTouchEnd}
        >
          {images.map((image, i) => (
            <img key={image} src={image} alt={`banner ${i}`} />
          ))}
        </div>

        <div className="banner-slider__dots">
          {images.map((image, i) => (
            <button
              type="button"
              aria-label="dot"
              key={image}
              className={cn('banner-slider__dot', {
                'banner-slider__dot_active': slideId === i,
              })}
              onClick={() => setSlideId(i)}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="arrow right"
        className="banner-slider__btn banner-slider__btn_right"
        onClick={() => {
          handleClick(1);
        }}
      />
    </section>
  );
};
