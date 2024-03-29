import axios from 'axios';

import Router from '~/routes';

const isObject = (o: any) => o === Object(o) && !Array.isArray(o) && typeof o !== 'function';

export const toCamelCase = (s: string) => s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
  .replace('-', '')
  .replace('_', ''));

export const toSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const caseTransfer = (o: any, type: 'Camel' | 'Snake'): any => {
  if (isObject(o)) {
    const n = {} as any;

    Object.keys(o)
      .forEach((k) => {
        n[(type === 'Camel' ? toCamelCase : toSnakeCase)(k)] = caseTransfer(o[k], type);
      });

    return n;
  } if (Array.isArray(o)) {
    return o.map((i) => caseTransfer(i, type));
  }

  return o;
};

const $axios = axios.create({baseURL: `https://testing-backend.admire.social`});

$axios.interceptors.response.use((response) => {
  if (['', 'json'].includes(response.request.responseType)) response.data = caseTransfer(response.data, 'Camel');
  return response;
}, (error) => {
  if (error.response.status === 401 && !['/auth', '/sign-up'].includes(Router.currentRoute.value.path)) {
    localStorage.removeItem('Authorization');
    Router.push('/auth');
  }
  return Promise.reject(error);
});

$axios.interceptors.request.use((request) => {
  if (localStorage.Authorization) {
    request.headers.set('Authorization', `JWT ${localStorage.Authorization}`);
  }
  if (!(request.data instanceof FormData)) request.data = caseTransfer(request.data, 'Snake');
  return request;
});

export default $axios;
