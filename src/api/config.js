import axios from 'axios';

const api = axios.create({
    baseURL: "https://redpharma-api.techrajshahi.com/api", //'http://127.0.0.1:8000/api', // ⚡ must match allowed_origins
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    // timeout: 10000,
});

export default api;
