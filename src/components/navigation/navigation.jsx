import { PersonFilter } from '../person-filter/person-filter';
import { CategoryFilter } from '../category-filter/category-filter';
import { SearchBar } from '../searchbar/searchbar';

export const Navigation = ({
  users,
  categories,
  onOwnerFilter,
  activeOwner,
  onSearch,
  searchQuery,
  onCategoryFilter,
  activeCaterories,
  onReset,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <PersonFilter
        users={users}
        onOwnerFilter={onOwnerFilter}
        activeOwner={activeOwner}
      />
      <SearchBar onSearch={onSearch} searchQuery={searchQuery} />
      <CategoryFilter
        categories={categories}
        onCategoryFilter={onCategoryFilter}
        activeCaterories={activeCaterories}
      />

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={onReset}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
