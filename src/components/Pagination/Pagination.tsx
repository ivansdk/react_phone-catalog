import cn from 'classnames';
import './Pagination.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const [searchParams] = useSearchParams();
  const pages = Math.ceil(total / perPage);

  const pageArr = [];

  for (let i = 0; i < pages; i += 1) {
    pageArr.push(i + 1);
  }

  const renderPageNumbers = () => {
    if (pages <= 1) {
      return null;
    }

    const pageNumbers = [];
    const visiblePages = 2;

    for (let i = 1; i <= pages; i += 1) {
      if (
        i === 1 ||
        i === pages ||
        (i >= currentPage - visiblePages && i <= currentPage + visiblePages)
      ) {
        pageNumbers.push(i);
      }
    }

    let prevPage: null | number = null;

    return pageNumbers.map(page => {
      const pageElements = [];

      if (prevPage !== null && page - prevPage > 1) {
        pageElements.push(
          <li
            key={`ellipsis-${prevPage + 1}`}
            className="pagination__page-item"
          >
            ...
          </li>,
        );
      }

      pageElements.push(
        <li
          key={page}
          className={cn('pagination__page-item', {
            'pagination__page-item_active': page === currentPage,
          })}
        >
          <Link
            className="pagination__page-link"
            to={{
              search: getSearchWith(searchParams, {
                page: `${page}`,
              }),
            }}
            onClick={() => {
              if (currentPage !== page) {
                window.scrollTo(0, 0);
              }
            }}
          >
            {page}
          </Link>
        </li>,
      );

      prevPage = page;

      return pageElements;
    });
  };

  return (
    <>
      {pageArr.length !== 0 && (
        <ul className="pagination">
          <li
            className={cn(
              'pagination__page-item pagination__page-item_arrow-left',
              {
                'pagination__page-item_disabled': currentPage === 1,
              },
            )}
          >
            <Link
              className="pagination__page-link"
              to={{
                search: getSearchWith(searchParams, {
                  page: `${currentPage - 1}`,
                }),
              }}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.47136 0.528636C5.21101 0.268287
                    4.7889 0.268287 4.52855
                    0.528636L0.528555 4.52864C0.268205
                    4.78899 0.268205 5.2111
                    0.528555 5.47145L4.52855 9.47145C4.7889
                    9.7318 5.21101 9.7318
                    5.47136 9.47145C5.73171 9.2111 5.73171
                    8.78899 5.47136 8.52864L1.94277
                    5.00004L5.47136 1.47145C5.73171 1.2111
                    5.73171 0.788986
                    5.47136 0.528636Z"
                  fill="#313237"
                />
              </svg>
            </Link>
          </li>

          {renderPageNumbers()}

          <li
            className={cn(
              'pagination__page-item pagination__page-item_arrow-right',
              {
                'pagination__page-item_disabled': currentPage === pages,
              },
            )}
          >
            <Link
              className="pagination__page-link"
              to={{
                search: getSearchWith(searchParams, {
                  page: `${currentPage + 1}`,
                }),
              }}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.52864 3.52861C5.78899 3.26826
                    6.2111
                    3.26826 6.47145 3.52861L10.4714
                    7.52861C10.7318
                    7.78896 10.7318 8.21107 10.4714 8.47141L6.47145
                    12.4714C6.2111 12.7318 5.78899 12.7318 5.52864
                    12.4714C5.26829
                    12.2111 5.26829 11.789 5.52864 11.5286L9.05723
                    8.00001L5.52864
                    4.47141C5.26829 4.21107 5.26829 3.78896
                    5.52864 3.52861Z"
                  fill="#313237"
                />
              </svg>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};
