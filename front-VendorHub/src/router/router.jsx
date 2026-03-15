import { createBrowserRouter } from 'react-router-dom';

import PublicLayout from '../layout/PublicLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import VendorDashboard from '../components/vendor/VendorDashboard';
import DashboardLayout from '../components/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from '../components/admin/Dashboard';
import AdminVendors from '../components/admin/Vendors';
import NotFoundPage from '../pages/NotFoundPage';
import AdminPermissions from '../components/admin/Permissions';
import AdminProducts from '../components/admin/Products';
import VendorProducts from '../components/vendor/Products';
import VendorAnalytics from '../components/vendor/Analytics';
import ProductDetailPage from '../pages/ProductDetailPage';
import ForgotPasswordPage from '../auth/ForgotPasswordPage';
import ResetPasswordPage from '../auth/ResetPasswordPage';
import VendorOrders from '../components/vendor/Orders';
import StorePage from '../pages/StorePage';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'store/:id', element: <StorePage /> },
    //   {
    //     path: 'orders',
    //     element: <ProtectedRoute roles={['Customer']}><CustomerOrdersPage /></ProtectedRoute>
    //   },
    //   {
    //     path: 'favorites',
    //     element: <ProtectedRoute roles={['Customer']}><FavoritesPage /></ProtectedRoute>
    //   },
    ],
  },
  {
    path: '/vendor',
    element: <ProtectedRoute ><DashboardLayout role="vendor" /></ProtectedRoute>,
    children: [
      { index: true, element: <VendorDashboard /> },
      { path: 'products', element: <VendorProducts /> },
      { path: 'analytics', element: <VendorAnalytics /> },
      { path: 'history', element: <VendorOrders /> },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute  ><DashboardLayout  role="admin"  /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'vendors', element: <AdminVendors /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'permissions', element: <AdminPermissions /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  }
]);

// roles={['Admin']}

// roles={['Vendor']} 