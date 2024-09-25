import cn from 'classnames';

export const PersonFilter = ({ users, onOwnerFilter, activeOwner }) => {
  return (
    <p className="panel-tabs has-text-weight-bold ">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={cn({ 'is-active': activeOwner === 'all' })}
        onClick={() => {
          onOwnerFilter('all');
        }}
      >
        All
      </a>

      {users.map(user => (
        <a
          data-cy="FilterUser"
          href="#/"
          key={user.id}
          className={cn({ 'is-active': activeOwner === user.name })}
          onClick={() => {
            onOwnerFilter(user.name);
          }}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
};
