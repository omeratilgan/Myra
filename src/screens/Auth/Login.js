import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { IMAGES } from '../../utils/constants.js';
import Button from '../../components/common/Button.js';
import Input from '../../components/common/Input.js';
import api from '../../api/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);


    // Giriş işlemi sonrasında
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
            return;
        }

        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            if (response.data.token) {
                await AsyncStorage.setItem('authToken', response.data.token);
                Alert.alert('Başarılı', 'Giriş başarılı!');
                navigation.navigate('Home');
            }
        } catch (error) {
            let errorMessage = 'Giriş yapılamadı';
            
            if (error.response) {
                // Sunucudan gelen hata mesajını kullan
                errorMessage = error.response.data.message || errorMessage;
            }
            
            Alert.alert('Hata', errorMessage);
            console.error('Login Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giriş Yap</Text>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            </View>
        
            <Text style={styles.label}>Şifre</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Şifre"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                    <Image
                        source={isPasswordVisible ? IMAGES.EYE : IMAGES.EYE_OFF} // Duruma göre görsel seç
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <Button title="Giriş Yap" onPress={handleLogin} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Hesabın yok mu? Kayıt Ol</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    linkText: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 15,
    },
});

export default Login;
