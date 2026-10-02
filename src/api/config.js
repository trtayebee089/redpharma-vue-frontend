import axios from 'axios';
import { normalizeApiBaseUrl } from './baseUrl';

const base_url = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
// const base_url = "https://redapi-staging.techrajshahi.com/api/";
// const base_url = "http://127.0.0.1:8000/api/";

const api = axios.create({
    baseURL: base_url,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});

api.interceptors.request.use((config) => {
    if (!base_url) {
        // Prevent accidental requests to the frontend origin when misconfigured.
        throw new axios.AxiosError('API configuration unavailable', 'ERR_API_CONFIG', config);
    }
    return config;
});

export default api;
