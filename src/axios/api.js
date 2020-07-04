import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const options = {
    baseURL: baseURL
};

const API = axios.create(options);

const setTokens = tokens => {

    API.defaults.headers['Authorization'] = `Bearer ${tokens['access']}`
};

export {API, setTokens}
