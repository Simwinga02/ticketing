import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1337';

const core = axios.create();
core.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token'
)}`;

export { core };
