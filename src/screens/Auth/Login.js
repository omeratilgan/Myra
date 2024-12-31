import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { IMAGES } from '../../utils/constants.js'; // constants.js'den IMAGES'ı import et
import Button from '../../components/common/Button.js';
import axios from 'axios';
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
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (data.token) {
            // Token'ı AsyncStorage'a kaydet
            await AsyncStorage.setItem('authToken', data.token);
            Alert.alert('Başarılı', 'Giriş başarılı!');
            navigation.navigate('Home');
        } else {
            Alert.alert('Hata', 'Giriş yapılamadı');
        }
    } catch (error) {
        console.error('Login Error:', error);
    }
};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giriş Yap</Text>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.inputField}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            </View>
        
            <Text style={styles.label}>Şifre</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputField}
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
    inputField: {
        flex: 1,
        height: 50,
        color: '#000',
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
