/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import { Navigation } from './components/navigation/navigation';
import { ProductList } from './components/product-list/product-list';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { SORTING_TYPES } from './constants';

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
  { ownerFilter, searchQuery, categoryFilter, sorting },
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
      const formettedProductName = product.name.toLowerCase();

      return formettedProductName.includes(formattedSearchQuery);
    });
  }

  if (categoryFilter.length) {
    filtredProducts = filtredProducts.filter(product => {
      return categoryFilter.includes(product.category.title);
    });
  }

  if (sorting.column) {
    filtredProducts.sort((current, next) => {
      let currentValue;
      let nextValue;
      let comp = 0;

      if (sorting.column === SORTING_TYPES.id) {
        currentValue = current.id;
        nextValue = next.id;
      }

      if (sorting.column === SORTING_TYPES.product) {
        currentValue = current.name;
        nextValue = next.name;
      }

      if (sorting.column === SORTING_TYPES.category) {
        currentValue = current.category.title;
        nextValue = next.category.title;
      }

      if (sorting.column === SORTING_TYPES.owner) {
        currentValue = current.owner.name;
        nextValue = next.owner.name;
      }

      if (typeof currentValue === 'string') {
        comp = currentValue.localeCompare(nextValue);
      } else {
        comp = currentValue - nextValue;
      }

      return sorting.order === 'asc' ? comp : comp * -1;
    });
  }

  return filtredProducts;
};

export const App = () => {
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [sorting, setSorting] = useState({
    column: null,
    order: null,
  });

  const visibleProducts = getVisibleProducts(products, {
    ownerFilter,
    searchQuery,
    categoryFilter,
    sorting,
  });

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleOwnerFilter = owner => {
    setOwnerFilter(owner);
  };

  const handleCategoryFilter = selectedCategories => {
    setCategoryFilter([...selectedCategories]);
  };

  const handleSorting = column => {
    if (!sorting.column || sorting.column !== column) {
      setSorting({
        column,
        order: 'asc',
      });

      return;
    }

    if (sorting.column === column) {
      setSorting({
        column,
        order: sorting.order === 'asc' ? 'des' : 'asc',
      });
    }
  };

  const handleReset = () => {
    setOwnerFilter('all');
    setSearchQuery('');
    setCategoryFilter([]);
    setSorting({
      column: null,
      order: null,
    });
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

        <ProductList
          products={visibleProducts}
          onSort={handleSorting}
          sorting={sorting}
        />
      </div>
    </div>
  );
};
