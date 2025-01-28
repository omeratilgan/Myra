import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Alert 
} from 'react-native';
import { useProduct } from '../../context/ProductContext';

const ProductDetailScreen = ({ navigation }) => {
    const { selectedProduct, deleteProduct } = useProduct();

    if (!selectedProduct) {
        return (
            <View style={styles.container}>
                <Text>Ürün bulunamadı</Text>
            </View>
        );
    }

    const handleDelete = () => {
        Alert.alert(
            'Ürünü Sil',
            'Bu ürünü silmek istediğinizden emin misiniz?',
            [
                {
                    text: 'İptal',
                    style: 'cancel'
                },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteProduct(selectedProduct.id);
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Hata', 'Ürün silinirken bir hata oluştu');
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.name}>{selectedProduct.name}</Text>
                <Text style={styles.price}>{selectedProduct.price} TL</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.editButton]}
                        onPress={() => navigation.navigate('EditProduct')}
                    >
                        <Text style={styles.buttonText}>Düzenle</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.button, styles.deleteButton]}
                        onPress={handleDelete}
                    >
                        <Text style={[styles.buttonText, styles.deleteButtonText]}>
                            Sil
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    price: {
        fontSize: 20,
        color: '#007AFF',
        fontWeight: '600',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    editButton: {
        backgroundColor: '#007AFF',
    },
    deleteButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DC3545',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteButtonText: {
        color: '#DC3545',
    },
});

export default ProductDetailScreen;