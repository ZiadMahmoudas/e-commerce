// Analytics.jsx
import { useEffect, useState } from 'react';
import { analyticsApi } from '../../api/index';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function VendorAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    analyticsApi.get().then(({ data }) => { if (data.success) setAnalytics(data.data); });
  }, []);

  if (!analytics) return <div className="animate-pulse h-64 bg-gray-200 rounded-xl" />;

  const chartData = analytics.monthlySales?.map((m) => ({
    month: `${m.year}-${String(m.month).padStart(2, '0')}`,
    revenue: m.revenue,
    orders: m.orderCount
  })).reverse() || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>

      {chartData.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold mb-4">Top Products</h2>
        {analytics.topProducts?.length === 0 ? (
          <p className="text-gray-500 text-sm">No sales yet.</p>
        ) : (
          <div className="space-y-3">
            {analytics.topProducts?.map((p, i) => (
              <div key={p.productId} className="flex items-center gap-4">
                <span className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">{i+1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.totalSold} units sold</p>
                </div>
                <span className="font-bold text-indigo-600">${p.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}