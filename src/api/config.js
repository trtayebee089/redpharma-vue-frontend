import axios from 'axios';

const base_url = "https://redpharma-api.techrajshahi.com/api/";
// const base_url = "https://redapi-staging.techrajshahi.com/api/";
// const base_url = "http://127.0.0.1:8002/api/";

const api = axios.create({
    baseURL: base_url,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});

export default api;
