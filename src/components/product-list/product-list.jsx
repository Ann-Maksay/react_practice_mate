import cn from 'classnames';

import { SORTING_TYPES } from '../../constants';

const columnList = Object.values(SORTING_TYPES);

export const ProductList = ({ products, onSort, sorting }) => {
  return (
    <div className="box table-container">
      {!products.length ? (
        <p data-cy="NoMatchingMessage">
          No products matching selected criteria
        </p>
      ) : (
        <table
          data-cy="ProductTable"
          className="table is-striped is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {columnList.map(column => (
                <th key={column}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {column}
                    <a href="#/" onClick={() => onSort(column)}>
                      <span className="icon">
                        <i
                          data-cy="SortIcon"
                          className={cn('fas', {
                            'fa-sort': sorting.column !== column,
                            'fa-sort-up':
                              sorting.column === column &&
                              sorting.order === 'asc',
                            'fa-sort-down':
                              sorting.column === column &&
                              sorting.order === 'des',
                          })}
                        />
                      </span>
                    </a>
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map(product => {
              const { category, owner } = product;

              return (
                <tr data-cy="Product" key={product.id}>
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>

                  <td
                    data-cy="ProductUser"
                    className={cn({
                      'has-text-link': owner.sex === 'm',
                      'has-text-danger': owner.sex === 'f',
                    })}
                  >
                    {owner.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
