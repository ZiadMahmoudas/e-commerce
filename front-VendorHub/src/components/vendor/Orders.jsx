import { useEffect, useState } from 'react';
import { analyticsApi } from '../../api';

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi.getOrders().then(({ data }) => {
      if (data.success) setOrders(data.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse space-y-4">{Array.from({length:3}).map((_,i)=><div key={i} className="h-24 bg-gray-200 rounded-xl"/>)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sales History</h1>
        <span className="text-sm text-gray-500">{orders.length} orders total</span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <p className="text-4xl mb-4">📊</p>
          <p className="text-gray-500">No sales yet. Your products are being reviewed.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Order ID','Customer','Items','Amount','Status','Date'].map((h)=>(
                  <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customerName || 'Customer'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items.length} item(s)</td>
                  <td className="px-6 py-4 text-sm font-bold text-indigo-600">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{order.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}