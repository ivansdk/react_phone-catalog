import { useCallback } from 'react';
import './BackToTop.scss';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';

export const BackToTop = () => {
  const { pathname } = useLocation();

  const HandleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      className={cn('top-btn', { 'top-btn_disabled': pathname === '/cart' })}
    >
      <span>Back to top</span>
      <button
        type="button"
        aria-label="Back to top"
        onClick={HandleBackToTop}
      />
    </div>
  );
};
