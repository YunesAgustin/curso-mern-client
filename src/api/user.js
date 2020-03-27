// Aca van todas las funciones para conectar con los end points de los usuarios
// Cuando uso fetch le hago la peticion para conectar con el server
// mandandole la url y los parametros de la misma

import { basePath, apiVersion } from './config';

export function signUpApi(data) {
  const url = `${basePath}/${apiVersion}/sign-up`;
  // Los parametros que le mando al end point
  const params = {
    method: 'POST',
    body: JSON.stringify(data), // Es el body que se pasa al back (el q se escribe en postman) hay que convertirlo en json
    headers: {
      'Content-Type': 'application/json' // Me fijo en el header de postman
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      if (result.user) {
        return { ok: true, message: 'Usuario creado correctamente' };
      }
      return { ok: false, message: result.message };
    })
    .catch(err => {
      return { ok: false, message: err.message };
    });
}

export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/sign-in`;
  const params = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function getUsersApi(token) {
  const url = `${basePath}/${apiVersion}/users`;

  const params = {
    method: 'GET', // Si no se pone nada toma como defecto GET
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function getUsersActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;

  const params = {
    method: 'GET', // Si no se pone nada toma como defecto GET
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-user/${userId}`;

  const formData = new FormData(); // Esto es obligatorio hacer cuando queremos mandar una img mediante una peticion  fetch

  formData.append('avatar', avatar, avatar.name);

  const params = {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result; // Devuelve el resultado del back
    })
    .catch(err => {
      return err.message; // Devuele el mesaje que pusimos en el back en caso de erro
    });
}

export function getAvatarApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

  // No uso params, ya que es un get y no hace falta aclarar y no se necesita autrizacion con token
  return fetch(url)
    .then(response => {
      return response.url;
    })
    .catch(err => {
      return err.message;
    });
}

export function updateUserApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/update-user/${userId}`;

  const params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(user)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}
