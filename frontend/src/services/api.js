import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5500"
});

export const uploadImage = (formData) => api.post('/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});