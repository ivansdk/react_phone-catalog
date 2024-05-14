import cn from 'classnames';

import './Prices.scss';
import React from 'react';

type Props = {
  currentPrice: number | undefined;
  oldPrice: number | undefined;
  big?: boolean;
};

export const Prices: React.FC<Props> = ({
  currentPrice,
  oldPrice,
  big = false,
}) => {
  return (
    <div
      className={cn('prices', {
        'prices_without-line': big,
      })}
    >
      <span
        className={cn('prices__price', {
          prices__price_fz32: big,
        })}
      >
        ${currentPrice}
      </span>
      <span className="prices__price prices__price_old">${oldPrice}</span>
    </div>
  );
};
