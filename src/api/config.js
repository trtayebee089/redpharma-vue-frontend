import axios from 'axios';

const base_url = `${import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '')}/`;
// const base_url = "https://redapi-staging.techrajshahi.com/api/";
// const base_url = "http://127.0.0.1:8000/api/";

const api = axios.create({
    baseURL: base_url,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});

export default api;
