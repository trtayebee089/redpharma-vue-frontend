import axios from 'axios';

const base_url = "https://redpharma-api.techrajshahi.com/api";

const api = axios.create({
    baseURL: base_url,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    // timeout: 10000,
});

export default api;
