import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER;

const authAxios = axios.create();
authAxios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token'
)}`;

export default authAxios;
