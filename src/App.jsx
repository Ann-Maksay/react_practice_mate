/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './App.scss';

import { Navigation } from './components/navigation/navigation';
import { ProductList } from './components/product-list/product-list';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map(product => {
  const category =
    categoriesFromServer.find(cat => cat.id === product.categoryId) || null;
  const user =
    usersFromServer.find(person => person.id === category.ownerId) || null;

  return {
    ...product,
    category,
    owner: user,
  };
});

export const App = () => {
  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Navigation />
        </div>

        <ProductList products={products} />
      </div>
    </div>
  );
};
