import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1337';

const authAxios = axios.create();
authAxios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token'
)}`;

export default authAxios;
