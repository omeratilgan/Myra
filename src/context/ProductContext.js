import React, { createContext, useContext, useReducer, useCallback } from 'react';
import axiosInstance from '../api/apiConfig';

// Context oluştur
const ProductContext = createContext();

// Initial state
const initialState = {
    products: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null
};

// Action types
const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_CATEGORIES: 'SET_CATEGORIES',
    ADD_PRODUCT: 'ADD_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    SET_SELECTED_PRODUCT: 'SET_SELECTED_PRODUCT'
};

// Reducer
const productReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, loading: action.payload };
        
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload };
        
        case ACTIONS.SET_PRODUCTS:
            return { ...state, products: action.payload, loading: false };
        
        case ACTIONS.SET_CATEGORIES:
            return { ...state, categories: action.payload };
        
        case ACTIONS.ADD_PRODUCT:
            return { 
                ...state, 
                products: [...state.products, action.payload]
            };
        
        case ACTIONS.UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => 
                    product.id === action.payload.id ? action.payload : product
                )
            };
        
        case ACTIONS.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => 
                    product.id !== action.payload
                )
            };
        
        case ACTIONS.SET_SELECTED_PRODUCT:
            return { ...state, selectedProduct: action.payload };
        
        default:
            return state;
    }
};

// Provider component
export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    // Ürünleri getir
    const fetchProducts = useCallback(async () => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            const response = await axiosInstance.get('/products');
            dispatch({ type: ACTIONS.SET_PRODUCTS, payload: response.data });
        } catch (error) {
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.message || 'Ürünler yüklenirken bir hata oluştu'
            });
        }
    }, []);

    // Kategorileri getir
    const fetchCategories = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/categories');
            dispatch({ type: ACTIONS.SET_CATEGORIES, payload: response.data });
        } catch (error) {
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: 'Kategoriler yüklenirken bir hata oluştu'
            });
        }
    }, []);

    // Yeni ürün ekle
    const addProduct = useCallback(async (productData) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            const response = await axiosInstance.post('/products', productData);
            dispatch({ type: ACTIONS.ADD_PRODUCT, payload: response.data });
            return response.data;
        } catch (error) {
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.message || 'Ürün eklenirken bir hata oluştu'
            });
            throw error;
        }
    }, []);

    // Ürün güncelle
    const updateProduct = useCallback(async (id, productData) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            const response = await axiosInstance.put(`/products/${id}`, productData);
            dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: response.data });
            return response.data;
        } catch (error) {
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.message || 'Ürün güncellenirken bir hata oluştu'
            });
            throw error;
        }
    }, []);

    // Ürün sil
    const deleteProduct = useCallback(async (id) => {
        try {
            await axiosInstance.delete(`/products/${id}`);
            dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: id });
        } catch (error) {
            dispatch({ 
                type: ACTIONS.SET_ERROR, 
                payload: error.response?.data?.message || 'Ürün silinirken bir hata oluştu'
            });
            throw error;
        }
    }, []);

    // Seçili ürünü ayarla
    const setSelectedProduct = useCallback((product) => {
        dispatch({ type: ACTIONS.SET_SELECTED_PRODUCT, payload: product });
    }, []);

    // Error'u temizle
    const clearError = useCallback(() => {
        dispatch({ type: ACTIONS.SET_ERROR, payload: null });
    }, []);

    const value = {
        ...state,
        fetchProducts,
        fetchCategories,
        addProduct,
        updateProduct,
        deleteProduct,
        setSelectedProduct,
        clearError
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook
export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};