import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_BASE_URL
});

export const uploadImage = (formData) => api.post('/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});