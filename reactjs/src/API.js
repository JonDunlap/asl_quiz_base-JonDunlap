import axios from 'axios';

const API = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:4000',
});

API.interceptors.response.use(
  (response) => (response ? response.data : {}),
  (error) => {
    console.log(error);
  }
);

// for each API request going out
API.interceptors.request.use(async (config) => {
  // pull the token out of the local storage
  const token = localStorage.getItem('token');
  // if there is no token, do nothing
  if (!token) return config;
  // if there is a token, set a header for any request that contains the token
  return {
    ...config,
    headers: { common: { token } },
  };
});

export default API;
