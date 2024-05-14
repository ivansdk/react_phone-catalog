import cn from 'classnames';

import { useContext, useEffect, useRef } from 'react';
import './Search.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';
import { WindowWidthContext } from '../../context/WindowWidthContext';
import React from 'react';

type Props = {
  activeSearch: boolean;
  setActiveSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Search: React.FC<Props> = ({ activeSearch, setActiveSearch }) => {
  const { windowWidth } = useContext(WindowWidthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const value = searchParams.get('query') || '';
  const { pathname } = useLocation();

  useEffect(() => {
    setActiveSearch(false);
  }, [windowWidth]);

  const handleSearchClick = () => {
    if (windowWidth < 1050 && !activeSearch) {
      setActiveSearch(true);
      inputRef.current?.focus();
    } else if (windowWidth < 1050 && activeSearch) {
      setActiveSearch(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, { query: event.target.value }));

    if (event.target.value.trim() === '') {
      setSearchParams(getSearchWith(searchParams, { query: null }));
    }
  };

  const handleClearInput = () => {
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <form className="search">
      <input
        type="text"
        value={value}
        className={cn('search__input', {
          search__input_active: activeSearch,
        })}
        placeholder={`Search in ${pathname.slice(1)}...`}
        ref={inputRef}
        onChange={handleInputChange}
        onBlur={() => {
          if (!value) {
            setActiveSearch(false);
          }
        }}
      />

      {value.length > 0 ? (
        <button
          type="button"
          aria-label="clear search"
          className="search__btn search__btn_clear"
          onClick={handleClearInput}
        />
      ) : (
        <button
          type="button"
          aria-label="search"
          className="search__btn search__btn_search"
          onClick={handleSearchClick}
        />
      )}
    </form>
  );
};
