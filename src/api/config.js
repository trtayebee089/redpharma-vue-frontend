import axios from 'axios';

const base_url = import.meta.env.VITE_API_BASE_URL
    || "https://national-thyself-thigh.ngrok-free.dev/api/";

const api = axios.create({
    baseURL: base_url,
    headers: { 'Accept': 'application/json' },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
