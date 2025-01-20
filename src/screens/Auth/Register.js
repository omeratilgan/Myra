import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Button from '../../components/common/Button.js';
import Input from '../../components/common/Input.js';
import api from '../../api/apiConfig';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Hata', 'Şifreler eşleşmiyor');
            return;
        }

        try {
            const response = await api.post('/auth/register', {
                email,
                password
            });

            if (response.data.success) {
                Alert.alert('Başarılı', 'Kayıt başarılı! Giriş yapabilirsiniz.');
                navigation.navigate('Login');
            }
        } catch (error) {
            let errorMessage = 'Kayıt işlemi başarısız';
            
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            
            Alert.alert('Hata', errorMessage);
            console.error('Register Error:', error);
        }
    };

    // ... rest of the component code ...
};

// ... styles ...

export default Register;