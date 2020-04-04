import { basePath, apiVersion } from './config';

export function getCoursesApi() {
  const url = `${basePath}/${apiVersion}/get-courses`;

  return fetch(url)
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

// Esta funcion es para conectarse con la api de udemy
export function getCoursesDataUdemyApi(id) {
  //Divido la url en dos para que no quede tan larga, no es necesario

  const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`;

  const coursesParams =
    '?fields[course]=title,headline,url,price,image_480x270';

  const url = baseUrl + coursesParams;

  return fetch(url)
    .then(async response => {
      return { code: response.status, data: await response.json() };
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function updateCourseApi(token, id, data) {
  const url = `${basePath}/${apiVersion}/update-course/${id}`;

  const params = {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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

export function addCourseApi(token, data) {
  const url = `${basePath}/${apiVersion}/add-course`;

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
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
