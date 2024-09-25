import { PersonFilter } from '../person-filter/person-filter';
import { CategoryFilter } from '../category-filter/category-filter';
import { SearchBar } from '../searchbar/searchbar';

export const Navigation = ({ users, categories }) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <PersonFilter users={users} />
      <SearchBar />
      <CategoryFilter categories={categories} />

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
