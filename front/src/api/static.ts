import axios from 'axios';
import {makeUseAxios} from 'axios-hooks'
const BASE_URL = 'http://127.0.0.1:8080'


export const ROUTES = {
    static: '/static',
    
}

export const useStaticApi = makeUseAxios({axios:axios.create({
    baseURL: BASE_URL + ROUTES.static,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  })})



  



