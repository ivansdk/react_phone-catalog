import { Routes, Route } from 'react-router-dom';
import { Root } from './Root';

import './App.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonePage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { CartPage } from './pages/CartPage/CartPage';
// eslint-disable-next-line
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import React from 'react';

const App: React.FC = () => (
  <>
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />

        <Route path="phones">
          <Route index element={<PhonePage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </>
);

export default App;
