export const CategoryFilter = ({ categories }) => {
  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className="button is-success mr-6 is-outlined"
      >
        All
      </a>

      {categories.map(category => (
        <a
          data-cy="Category"
          className="button mr-2 my-1 is-info"
          href="#/"
          key={category.id}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};
