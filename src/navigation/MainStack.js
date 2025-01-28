import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductsScreen from '../screens/Products/ProductsScreen';
import ProductDetailScreen from '../screens/Products/ProductDetailScreen';
import OrdersScreen from '../screens/Orders/OrdersScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Icon paketini yüklemeniz gerekebilir

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Ana tab navigasyonu
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    title: 'Ana Sayfa',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Products" 
                component={ProductsScreen}
                options={{
                    title: 'Ürünler',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cake" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Orders" 
                component={OrdersScreen}
                options={{
                    title: 'Siparişler',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="list" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

// Ana stack navigasyonu
const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="MainTabs" 
                component={TabNavigator} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="ProductDetail" 
                component={ProductDetailScreen}
                options={{
                    title: 'Ürün Detayı',
                    headerBackTitleVisible: false
                }}
            />
        </Stack.Navigator>
    );
};

export default MainStack;