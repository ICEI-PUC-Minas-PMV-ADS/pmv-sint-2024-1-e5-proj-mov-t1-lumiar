import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'x-api-key': '428b5b8d-2caa-4dfe-8bcc-f8aecd587296'
    },
});

export default api;