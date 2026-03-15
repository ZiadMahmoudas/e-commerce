// Vendor Dashboard
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analyticsApi } from '../../api';

export default function VendorDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi.get().then(({ data }) => {
      if (data.success) setAnalytics(data.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-32 bg-gray-200 rounded-xl"/></div>;

  const stats = analytics ? [
    { label: 'Total Products', value: analytics.totalProducts, icon: '📦', color: 'bg-blue-500' },
    { label: 'Approved', value: analytics.approvedProducts, icon: '✅', color: 'bg-green-500' },
    { label: 'Pending', value: analytics.pendingProducts, icon: '⏳', color: 'bg-yellow-500' },
    { label: 'Total Orders', value: analytics.totalOrders, icon: '🛒', color: 'bg-purple-500' },
    { label: 'Revenue', value: `$${analytics.totalRevenue?.toFixed(2)}`, icon: '💰', color: 'bg-indigo-500' },
    { label: 'Total Views', value: analytics.totalViews, icon: '👁️', color: 'bg-pink-500' },
  ] : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's your store overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
              <span>{s.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {analytics?.topProducts?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-3">
            {analytics.topProducts.map((p) => (
              <div key={p.productId} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.totalSold} sold</p>
                </div>
                <span className="font-bold text-indigo-600">${p.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Link to="/vendor/products" className="bg-indigo-600 text-white rounded-xl p-6 hover:bg-indigo-700 transition-colors text-center">
          <p className="text-2xl mb-2">📦</p>
          <p className="font-bold">Manage Products</p>
        </Link>
        <Link to="/vendor/analytics" className="bg-purple-600 text-white rounded-xl p-6 hover:bg-purple-700 transition-colors text-center">
          <p className="text-2xl mb-2">📈</p>
          <p className="font-bold">View Analytics</p>
        </Link>
      </div>
    </div>
  );
}