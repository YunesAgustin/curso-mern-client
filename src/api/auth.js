import { basePath, apiVersion } from './config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode'; // Es para decodificar el token

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === 'null') {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || refreshToken === 'null') {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessTokenApi(refreshToken) {
  const url = ` ${basePath}/${apiVersion}/refresh-access-token`;
  const bodyObj = {
    refreshToken: refreshToken
  };

  const params = {
    method: 'POST',
    body: JSON.stringify(bodyObj),
    headers: {
      'Content-type': 'application/json'
    }
  };

  return fetch(url, params)
    .then(response => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then(result => {
      if (!result) {
        logout();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
  // Funcion para controlar si expiro un token que le envio pr parametro
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000; // Pasa la fecha de ahora a una fecha en unix = moment().unix()
  return now > exp; // Devuelve true si expiro y false si no expiro
}
