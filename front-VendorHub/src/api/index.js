// import axios from 'axios';

// const api = axios.create({ baseURL: '/api' });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(err);
//   }
// );

// // Auth
// export const authApi = {
//   register: (data) => api.post('/account/register', data),
//   login: (data) => api.post('/account/login', data),
//   me: () => api.get('/account/me'),
// };

// // Products
// export const productApi = {
//   getAll: (params) => api.get('/product', { params }),
//   getById: (id) => api.get(`/product/${id}`),
//   create: (data) => api.post('/product', data),
//   update: (id, data) => api.put(`/product/${id}`, data),
//   delete: (id) => api.delete(`/product/${id}`),
//   updateStock: (id, stock) => api.patch(`/product/${id}/stock`, { stock }),
//   getMyProducts: () => api.get('/product/vendor/mine'),
//   getReviews: (id) => api.get(`/product/${id}/reviews`),
//   submitReview: (id, data) => api.post(`/product/${id}/reviews`, data),
// };

// // Orders
// export const orderApi = {
//   place: (data) => api.post('/order', data),
//   getMyOrders: () => api.get('/order'),
// };

// // Favorites
// export const favoriteApi = {
//   getAll: () => api.get('/favorite'),
//   toggle: (productId) => api.post(`/favorite/${productId}`),
// };

// // Notifications
// export const notificationApi = {
//   getAll: () => api.get('/notification'),
//   markRead: (id) => api.patch(`/notification/${id}/read`),
//   markAllRead: () => api.patch('/notification/read-all'),
// };

// // Analytics (Vendor)
// export const analyticsApi = {
//   get: () => api.get('/analytics'),
//   getOrders: () => api.get('/analytics/orders'),
// };

// // Admin
// export const adminApi = {
//   getPendingVendors: () => api.get('/admin/vendors/pending'),
//   vendorDecision: (id, data) => api.post(`/admin/vendors/${id}/decision`, data),
//   getPendingProducts: () => api.get('/admin/products/pending'),
//   productDecision: (id, data) => api.post(`/admin/products/${id}/decision`, data),
//   getRolePermissions: (role) => api.get(`/admin/permissions/role/${role}`),
//   updateRolePermission: (data) => api.put('/admin/permissions/role', data),
//   getUserPermissions: (userId) => api.get(`/admin/permissions/user/${userId}`),
//   updateUserPermission: (userId, permId, data) => api.put(`/admin/permissions/user/${userId}/${permId}`, data),
// };

// export default api;