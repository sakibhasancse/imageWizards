import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000'
});

export const uploadImage = (formData) => api.post('/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});