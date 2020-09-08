import axios from 'axios';

export const baseURL = 'http://192.168.10.10:3333';

const api = axios.create({
  baseURL,
});

export default api;