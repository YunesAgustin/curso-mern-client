import React, { useState, useEffect } from 'react';
import { getAccessTokenApi } from '../../../api/auth';
import { getUsersActiveApi } from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers';
import './Users.scss';

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false); // Se encarga de actualizar el useEffect cada vez que actualizo un usuario
  const token = getAccessTokenApi();

  useEffect(() => {
    getUsersActiveApi(token, true).then(response => {
      setUsersActive(response.users);
    });
    getUsersActiveApi(token, false).then(response => {
      setUsersInactive(response.users);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);

  return (
    <div className="users">
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}
