import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),

  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.role === 'Admin';
  },

  isVendor: () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.role === 'Vendor';
  },

  isCustomer: () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.role === 'Customer';
  },
}));