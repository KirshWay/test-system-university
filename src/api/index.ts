import axios from 'axios';

const $axios = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}`,
});

export default $axios;
