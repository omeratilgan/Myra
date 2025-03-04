import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Alert, 
    TouchableOpacity 
} from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import api from '../../api/apiConfig';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Hata', 'Lütfen email adresinizi girin');
            return;
        }

        try {
            setLoading(true);
            // API endpoint'inize göre düzenleyin
            await api.post('/auth/forgot-password', { email });
            Alert.alert(
                'Başarılı',
                'Şifre sıfırlama bağlantısı email adresinize gönderildi.',
                [
                    {
                        text: 'Tamam',
                        onPress: () => navigation.navigate('Login')
                    }
                ]
            );
        } catch (error) {
            Alert.alert(
                'Hata',
                error.response?.data?.message || 'Şifre sıfırlama işlemi başarısız'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Şifremi Unuttum</Text>
                <Text style={styles.subtitle}>
                    Email adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
                </Text>
            </View>

            <View style={styles.form}>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Button
                    title="Şifremi Sıfırla"
                    onPress={handleResetPassword}
                    disabled={loading}
                />

                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Giriş Ekranına Dön</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 60,
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    form: {
        gap: 20,
    },
    backButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#007BFF',
        fontSize: 16,
    },
});

export default ForgotPassword;