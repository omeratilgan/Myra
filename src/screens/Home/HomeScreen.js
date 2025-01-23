import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/common/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            navigation.replace('Login');
        } catch (error) {
            console.error('Logout Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ana Sayfa</Text>
            <Button 
                title="Çıkış Yap" 
                onPress={handleLogout}
                color="#dc3545" // kırmızı renk
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
});

export default Home;