import axios from 'axios';
import { getAccessToken } from './tokens';

const conf = {
  baseURL: 'http://localhost:4000/api/',
  timeout: 5000,
};

const server = axios.create(conf);

server.interceptors.request.use(addAuthToken);

function addAuthToken(request) {
  const token = getAccessToken();

  if (token !== null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}

export { server };
