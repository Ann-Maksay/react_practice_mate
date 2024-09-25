export const PersonFilter = ({ users }) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a data-cy="FilterAllUsers" href="#/">
        All
      </a>

      {users.map(user => (
        <a data-cy="FilterUser" href="#/" className="is-active" key={user.id}>
          {user.name}
        </a>
      ))}
    </p>
  );
};
