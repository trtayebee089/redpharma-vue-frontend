import axios from 'axios';

const base_url = window.location.hostname === "localhost" ? "http://127.0.0.1:8000/api" : "https://redpharma-api.techrajshahi.com/api";

const api = axios.create({
    baseURL: base_url,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    // timeout: 10000,
});

export default api;
