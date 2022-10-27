import axios from 'axios'

//const BASE_URL = import.meta.env.VUE_APP_BASE_URL;
const BASE_URL = "http://localhost:3030";

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        
        'Access-Control-Allow-Origin': '*',
        'Accept' : 'application/json, text/plain, */*',
        'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
    
      }

});

export default http;