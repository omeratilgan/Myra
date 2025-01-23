import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Home from '../screens/Home/HomeScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen 
                name="Home" 
                component={Home}
                options={{
                    headerLeft: null, // Geri dönüş butonunu kaldırır
                    gestureEnabled: false // Geri kaydırma hareketini devre dışı bırakır
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;