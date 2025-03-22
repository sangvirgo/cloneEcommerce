import axios from "axios";

export const API_BASE_URL = 'http://localhost:8080';


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json'
    }
});

// Thêm interceptor để tự động gắn token vào mỗi request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);