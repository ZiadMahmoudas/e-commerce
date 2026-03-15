import { useEffect, useState } from 'react';
import { adminApi } from '../../api';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState('');

  const load = () => {
    adminApi.getPendingProducts().then(({ data }) => {
      if (data.success) setProducts(data.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const decide = async (id, decision, r) => {
    try {
      const { data } = await adminApi.productDecision(id, { decision, reason: r });
      if (data.success) {
        toast.success(`Product ${decision.toLowerCase()}!`);
        setRejecting(null);
        setReason('');
        load();
      }
    } catch { toast.error('Action failed'); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Product Approvals</h1>

      {loading ? <div className="animate-pulse h-64 bg-gray-200 rounded-xl" /> :
      products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <p className="text-4xl mb-4">✅</p>
          <p className="text-gray-500">No pending product approvals!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Product','Vendor','Category','Price','Stock','Actions'].map((h)=>(
                  <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <>
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 text-sm">{p.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.vendorName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.categoryName}</td>
                    <td className="px-6 py-4 text-sm font-bold text-indigo-600">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.stock}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => decide(p.id, 'Approved', '')}
                          className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700">
                          Approve
                        </button>
                        <button onClick={() => setRejecting(p.id)}
                          className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                  {rejecting === p.id && (
                    <tr key={`reject-${p.id}`}>
                      <td colSpan={6} className="px-6 py-3 bg-red-50">
                        <div className="flex gap-3 items-end">
                          <input type="text" placeholder="Rejection reason" value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="border border-red-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-red-500" />
                          <button onClick={() => decide(p.id, 'Rejected', reason)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Confirm</button>
                          <button onClick={() => setRejecting(null)}
                            className="border border-gray-300 px-4 py-2 rounded-lg text-sm">Cancel</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}