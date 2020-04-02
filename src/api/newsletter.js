import { basePath, apiVersion } from './config';

export function subscribeNewsletterApi(email) {
  const url = `${basePath}/${apiVersion}/subscribe-newsletter/${email}`;

  const params = {
    method: 'POST'
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}
