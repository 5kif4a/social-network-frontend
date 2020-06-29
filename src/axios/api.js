import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const options = {
    baseURL: baseURL
};

const API = axios.create(options);

const setTokens = tokens => {
    localStorage.setItem('access_token', tokens['access']);
    localStorage.setItem('refresh_token', tokens['refresh']);
    API.defaults.headers['Authorization'] = `Bearer ${tokens['access']}`
};

export {API, setTokens}
