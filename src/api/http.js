import axios from 'axios'

const BASE_URL = process.env.VUE_APP_BASE_URL;

const http = axios.create({
    baseURL: BASE_URL
});

export default http;