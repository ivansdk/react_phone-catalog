import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrums } from '../../components/BreadCrums/BreadCrums';
import { ProductContext } from '../../context/ProductContext';
import './FavoritesPage.scss';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Message } from '../../components/Message/Message';
import { Product } from '../../Types/Product';
import { CartAndFavContext } from '../../context/CartAndFavContext';
import React from 'react';

function filterProduct(products: Product[], query: string): Product[] {
  if (!query) {
    return products;
  }

  return products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );
}

export const FavoritesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { products } = useContext(ProductContext);
  const { favoritesProducts } = useContext(CartAndFavContext);

  const currentFav: Product[] = products.filter(product =>
    favoritesProducts.includes(product.itemId),
  );

  const query = searchParams.get('query') || '';

  let filteredFav = filterProduct(currentFav, query);

  useEffect(() => {
    filteredFav = filterProduct(currentFav, query);
  }, [query]);

  return (
    <>
      <BreadCrums />

      <div className="favorites">
        <div className="title">Favourites</div>
        <div className="favorites__subtitle subtitle">
          {favoritesProducts.length} items
        </div>

        {products.length !== 0 && currentFav.length === 0 && (
          <Message messageText="There is no items" />
        )}

        {currentFav.length > 0 && filteredFav.length > 0 && (
          <div className="favorites__products">
            {filteredFav.map(product => (
              <ProductCard
                key={product.itemId}
                id={product.itemId}
                path={`/phones/${product.itemId}`}
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
        )}

        {currentFav.length > 0 && filteredFav.length === 0 && (
          <Message messageText="No matching products found" />
        )}
      </div>
    </>
  );
};
