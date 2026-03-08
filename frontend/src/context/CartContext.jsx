import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartService } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const userId = user?.id || localStorage.getItem('userId');

  const calculateTotal = (items) => {
    const sum = items.reduce(
      (acc, item) => acc + (item.price * item.quantity),
      0
    );
    setTotal(sum);
  };

  const fetchCart = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const response = await cartService.getCart(userId);
      setCart(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId, fetchCart]);

  const addItem = async (productId, quantity) => {
    try {
      await cartService.addItem(userId, productId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeItem = async (cartId) => {
    try {
      await cartService.removeItem(cartId);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateItem = async (cartId, quantity) => {
    try {
      await cartService.updateItem(cartId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clear(userId);
      setCart([]);
      setTotal(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        loading,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
