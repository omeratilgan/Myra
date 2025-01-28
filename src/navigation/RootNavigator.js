import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const RootNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            setIsAuthenticated(!!token);
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return null; // veya bir loading spinner
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="Main" component={MainStack} />
            ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;