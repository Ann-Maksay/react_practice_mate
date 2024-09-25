import cn from 'classnames';

export const CategoryFilter = ({
  categories,
  onCategoryFilter,
  activeCaterories,
}) => {
  const handleFilter = categoryTitle => {
    const isActive = activeCaterories.includes(categoryTitle);

    if (isActive) {
      onCategoryFilter(
        activeCaterories.filter(category => category !== categoryTitle),
      );

      return;
    }

    onCategoryFilter([...activeCaterories, categoryTitle]);
  };

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className="button is-success mr-6 is-outlined"
        onClick={() => onCategoryFilter([])}
      >
        All
      </a>

      {categories.map(category => {
        return (
          <a
            data-cy="Category"
            className={cn('button mr-2 my-1', {
              'is-info': activeCaterories.includes(category.title),
            })}
            href="#/"
            key={category.id}
            onClick={() => handleFilter(category.title)}
          >
            {category.title}
          </a>
        );
      })}
    </div>
  );
};
