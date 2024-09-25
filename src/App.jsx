/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
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

const getVisibleProducts = (
  list,
  { ownerFilter, searchQuery, categoryFilter },
) => {
  let filtredProducts = [...list];

  if (ownerFilter !== 'all') {
    filtredProducts = filtredProducts.filter(
      product => product.owner.name === ownerFilter,
    );
  }

  const formattedSearchQuery = searchQuery.toLowerCase().trim();

  if (formattedSearchQuery) {
    filtredProducts = filtredProducts.filter(product => {
      return product.name.includes(formattedSearchQuery);
    });
  }

  if (categoryFilter.length) {
    filtredProducts = filtredProducts.filter(product => {
      return categoryFilter.includes(product.category.title);
    });
  }

  return filtredProducts;
};

export const App = () => {
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);

  const visibleProducts = getVisibleProducts(products, {
    ownerFilter,
    searchQuery,
    categoryFilter,
  });

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleOwnerFilter = owner => {
    setOwnerFilter(owner);
  };

  const handleCategoryFilter = category => {
    if (!categoryFilter.includes(category)) {
      setCategoryFilter([...categoryFilter, category]);
    }
  };

  const handleReset = () => {
    setOwnerFilter('all');
    setSearchQuery('');
    setCategoryFilter([]);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Navigation
            users={usersFromServer}
            categories={categoriesFromServer}
            onOwnerFilter={handleOwnerFilter}
            activeOwner={ownerFilter}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onCategoryFilter={handleCategoryFilter}
            activeCaterories={categoryFilter}
            onReset={handleReset}
          />
        </div>

        <ProductList products={visibleProducts} />
      </div>
    </div>
  );
};
