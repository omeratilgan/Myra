import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor - her istekte token kontrolü
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server kaynaklı hatalar
            switch (error.response.status) {
                case 401:
                    // Token geçersiz veya expire olmuş
                    AsyncStorage.removeItem('authToken');
                    // Kullanıcıyı login sayfasına yönlendir
                    break;
                case 404:
                    console.error('Kaynak bulunamadı');
                    break;
                case 500:
                    console.error('Sunucu hatası');
                    break;
                default:
                    console.error('Bir hata oluştu');
            }
        }
        return Promise.reject(error);
    }
);

export default api;