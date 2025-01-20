import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ 
    title, 
    onPress, 
    color = '#007BFF', // varsayılan renk
    textColor = '#fff',  // metin rengi için yeni prop
    style, // ek stil prop'u
    disabled = false // devre dışı durumu için
}) => {
    return (
        <TouchableOpacity 
            style={[
                styles.button,
                { backgroundColor: color },
                disabled && styles.disabled,
                style // dışarıdan gelen ek stiller
            ]} 
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[
                styles.buttonText,
                { color: textColor },
                disabled && styles.disabledText
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabled: {
        opacity: 0.6,
    },
    disabledText: {
        opacity: 0.8,
    }
});

export default Button;