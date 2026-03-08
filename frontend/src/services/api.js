import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth interceptor to add token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productService = {
  getAll: () => api.get('/products'),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
};

export const cartService = {
  addItem: (userId, productId, quantity) =>
    api.post('/cart/add', { userId, productId, quantity }),
  getCart: (userId) => api.get(`/cart/${userId}`),
  getTotal: (userId) => api.get(`/cart/${userId}/total`),
  updateItem: (cartId, quantity) =>
    api.put(`/cart/${cartId}`, { quantity }),
  removeItem: (cartId) => api.delete(`/cart/${cartId}`),
  clear: (userId) => api.delete(`/cart/clear/${userId}`),
};

export const orderService = {
  create: (userId, notes) =>
    api.post('/orders', { userId, notes }),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  getById: (orderId) => api.get(`/orders/${orderId}`),
  getAll: () => api.get('/orders'),
  updateStatus: (orderId, status) =>
    api.put(`/orders/${orderId}/status`, { status }),
};

export const userService = {
  register: (username, email, password, fullName) =>
    api.post('/users/register', { username, email, password, fullName }),
  login: (username, password) =>
    api.post('/users/login', { username, password }),
  getById: (id) => api.get(`/users/${id}`),
  getByUsername: (username) => api.get(`/users/username/${username}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
};

export default api;
