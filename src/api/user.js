// Aca van todas las funciones para conectar con los end points de los usuarios

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
