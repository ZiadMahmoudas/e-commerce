import { useEffect, useState } from 'react';
import { adminApi } from '../../api';
import toast from 'react-hot-toast';

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState('');
  const [rejecting, setRejecting] = useState(null);

  const load = () => {
    adminApi.getPendingVendors().then(({ data }) => {
      if (data.success) setVendors(data.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const decide = async (id, decision, r) => {
    try {
      const { data } = await adminApi.vendorDecision(id, { decision, reason: r });
      if (data.success) {
        toast.success(`Vendor ${decision.toLowerCase()} successfully!`);
        setRejecting(null);
        setReason('');
        load();
      }
    } catch {
      toast.error('Action failed');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Vendor Approvals</h1>
      <p className="text-gray-500">Review and approve/reject vendor registration requests.</p>

      {loading ? (
        <div className="animate-pulse space-y-3">{Array.from({length:3}).map((_,i)=><div key={i} className="h-20 bg-gray-200 rounded-xl"/>)}</div>
      ) : vendors.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <p className="text-4xl mb-4">✅</p>
          <p className="text-gray-500">No pending vendor approvals!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {vendors.map((v) => (
            <div key={v.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{v.storeName}</h3>
                  <p className="text-sm text-gray-500 mt-1">{v.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span>👤 {v.ownerName}</span>
                    <span>📧 {v.ownerEmail}</span>
                    <span>📅 {new Date(v.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => decide(v.id, 'Approved', '')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => setRejecting(v.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>

              {rejecting === v.id && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg space-y-3">
                  <label className="block text-sm font-medium text-red-800">Rejection Reason</label>
                  <textarea
                    rows={2} value={reason} onChange={(e) => setReason(e.target.value)}
                    placeholder="Please provide a reason..."
                    className="w-full border border-red-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => decide(v.id, 'Rejected', reason)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                      Confirm Reject
                    </button>
                    <button onClick={() => setRejecting(null)}
                      className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}