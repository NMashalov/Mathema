import axios from 'axios';
import {makeUseAxios} from 'axios-hooks'
const BASE_URL = 'http://127.0.0.1:8000'


// axios.interceptors.request.use(
//     async (config) => {
//       const token = localStorage.getItem("token");
  
//       if (token) {
//         config.headers = {
//           authorization: `Bearer ${token}`
//         };
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );
  
//   // response interceptor intercepting 401 responses, refreshing token and retrying the request
//   axios.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const config = error.config;
  
//       if (error.response.status === 401 && !config._retry) {
//         // we use this flag to avoid retrying indefinitely if
//         // getting a refresh token fails for any reason
//         config._retry = true;
//         localStorage.setItem("token", await refreshAccessToken());
  
//         return axios(config);
//       }
  
//       return Promise.reject(error);
//     }
//   );



export const CHESS_ROUTES = {
    MOVE: '/move'
}


export const useChessApi = makeUseAxios({axios:axios.create({
    baseURL: BASE_URL,
    method: 'POST',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'},
  })})