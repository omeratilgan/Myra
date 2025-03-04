import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

const RootNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            // Token varsa ve geçerliyse true, yoksa false
            setIsAuthenticated(!!token);
        } catch (error) {
            console.error('Auth check failed:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <Stack.Screen name="Auth" component={AuthStack} />
            ) : (
                <Stack.Screen name="Main" component={MainStack} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;