import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { IMAGES } from '../../utils/constants.js';
import Button from '../../components/common/Button.js';
import Input from '../../components/common/Input.js';
import api from '../../api/apiConfig';

const Register = ({ navigation }) => {
    const [name, setName] = useState(''); // Yeni state eklendi
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) { // name kontrolü eklendi
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Hata', 'Şifreler eşleşmiyor');
            return;
        }

        try {
            const response = await api.post('/auth/register', {
                name, // API isteğine name eklendi
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kayıt Ol</Text>
            
            <Text style={styles.label}>İsim</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="İsim"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
            </View>
            
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
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                    <Image
                        source={isPasswordVisible ? IMAGES.EYE : IMAGES.EYE_OFF}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Şifre Tekrar</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Şifre Tekrar"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!isConfirmPasswordVisible}
                />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                    <Image
                        source={isConfirmPasswordVisible ? IMAGES.EYE : IMAGES.EYE_OFF}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <Button title="Kayıt Ol" onPress={handleRegister} />
            
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Zaten hesabın var mı? Giriş Yap</Text>
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

export default Register;