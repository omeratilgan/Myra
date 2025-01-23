import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const baseURL = Platform.OS === 'android' 
    ? 'http://192.168.1.138:3000'  // Kendi local IP adresinizi yazın
    //? 'http://10.0.2.2:3000'  // Android Emulator için
    : 'http://localhost:3000'; // iOS için

const api = axios.create({
    baseURL,
    timeout: 10000, // Timeout süresini artırdık
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

console.log('API Base URL:', baseURL); // Debug için URL'i loglayalım

// Debug için request ve response logları
api.interceptors.request.use(request => {
    console.log('API Request:', request);
    return request;
});

api.interceptors.response.use(
    response => {
        console.log('API Response:', response);
        return response;
    },
    error => {
        console.log('API Error:', error);
        return Promise.reject(error);
    }
);

export default api;