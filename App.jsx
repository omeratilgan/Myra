import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ProductProvider } from './src/context/ProductContext';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
    return (
        <ProductProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </ProductProvider>
    );
};

export default App;