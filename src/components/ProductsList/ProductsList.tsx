import { useSearchParams } from 'react-router-dom';

import './ProductsList.scss';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { ProductCard } from '../ProductCard/ProductCard';
import { Dropdown } from '../Dropdown/Dropdown';
import { Pagination } from '../Pagination/Pagination';
import { Message } from '../Message/Message';
import { Product } from '../../Types/Product';
import { getProductsByCategory } from '../../helpers/api';
import React from 'react';

function filterProduct(
  product: Product[],
  query: string,
  sort: string,
): Product[] {
  let filteredProducts = [...product];

  if (query) {
    filteredProducts = filteredProducts.filter(prod => {
      return prod.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
  }

  if (sort) {
    switch (sort) {
      case 'new':
        filteredProducts.sort(
          (productA, productB) => productB.year - productA.year,
        );
        break;

      case 'price':
        filteredProducts.sort(
          (productA, productB) => productA.price - productB.price,
        );
        break;

      case 'name':
        filteredProducts.sort((productA, productB) => {
          return productA.name.localeCompare(productB.name);
        });
        break;

      default:
        return filteredProducts;
    }
  }

  return filteredProducts;
}

type Props = {
  title: string;
  category: string;
};

export const ProductsList: React.FC<Props> = ({ title, category }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '16';
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';

  const [filteredItems, setFilteredItems] = useState<Product[]>(
    filterProduct(products, query, sort),
  );

  function displayData(pageNumber: number): Product[] {
    if (perPage === 'all') {
      return filteredItems;
    }

    const startIndex = (pageNumber - 1) * +perPage;
    const endIndex = startIndex + +perPage;
    const pageData = filteredItems.slice(startIndex, endIndex);

    return pageData;
  }

  const currentItems = displayData(+page);

  useEffect(() => {
    setLoader(true);
    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoader(false));
  }, [category]);

  useEffect(() => {
    setFilteredItems(filterProduct(products, query, sort));
  }, [products, sort, perPage, query]);

  return (
    <>
      <section className="products">
        <div className="products__title title">{title}</div>
        <div className="products__count subtitle">
          {`${filteredItems.length} models`}
        </div>

        {loader && <Loader />}

        {!loader && !errorMessage && products.length > 0 ? (
          <div className="products__wrapper">
            <div className="products__filters">
              <Dropdown
                title="Sort by"
                selectType="sort"
                currentOption={sort}
                options={[
                  { label: 'Newest', value: 'new' },
                  { label: 'Alphabetically', value: 'name' },
                  { label: 'Cheapest', value: 'price' },
                ]}
              />

              <Dropdown
                title="Items on page"
                selectType="perPage"
                currentOption={perPage}
                options={[
                  { label: '4', value: '4' },
                  { label: '8', value: '8' },
                  { label: '16', value: '16' },
                  { label: 'All', value: 'all' },
                ]}
              />
            </div>

            {products.length !== 0 && currentItems.length === 0 && !loader && (
              <Message messageText="No matching products found" />
            )}

            <div className="products__grid">
              {currentItems.map(product => (
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
              ))}
            </div>
          </div>
        ) : (
          products.length === 0 &&
          !loader &&
          !errorMessage && <Message messageText="There is no items" />
        )}

        {!loader && errorMessage && <Message messageText={errorMessage} />}

        {Math.ceil(filteredItems.length / +perPage) > 2 && (
          <Pagination
            total={filteredItems.length}
            perPage={+perPage}
            currentPage={+page}
          />
        )}
      </section>
    </>
  );
};
