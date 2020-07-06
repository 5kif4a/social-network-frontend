import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const options = {
    baseURL: baseURL
};

const API = axios.create(options);

API.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});


export {API, baseURL}
