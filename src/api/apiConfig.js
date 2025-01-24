import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Bilgisayarınızın yerel IP adresi
const baseURL = 'http://192.168.1.138:3000'; // X yerine kendi IP adresinizi yazınipcon

const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Debug için request ve response logları
api.interceptors.request.use(request => {
    console.log('API Request:', {
        url: request.url,
        method: request.method,
        data: request.data,
        baseURL: request.baseURL
    });
    return request;
});

api.interceptors.response.use(
    response => {
        console.log('API Response:', response.data);
        return response;
    },
    error => {
        console.log('API Error:', {
            message: error.message,
            response: error.response?.data
        });
        return Promise.reject(error);
    }
);

export default api;