import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true, // For Sanctum cookies
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // You can attach token here if not using Sanctum cookies
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle global errors, e.g., 401 Unauthorized to refresh token or redirect to login
        if (error.response?.status === 401) {
            // Trigger logout or refresh token logic
            if (typeof window !== 'undefined') {
                // window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
