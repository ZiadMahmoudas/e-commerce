import { useEffect, useState } from 'react';
import { productApi } from '../../api';
import toast from 'react-hot-toast';

export default function VendorProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', price: '', stock: '', categoryId: 1, imageUrls: [] });

  const load = () => {
    productApi.getMyProducts().then(({ data }) => {
      if (data.success) setProducts(data.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock), categoryId: parseInt(form.categoryId) };
      if (editing) {
        await productApi.update(editing.id, payload);
        toast.success('Product updated!');
      } else {
        await productApi.create(payload);
        toast.success('Product submitted for approval!');
      }
      setShowForm(false);
      setEditing(null);
      setForm({ title: '', description: '', price: '', stock: '', categoryId: 1, imageUrls: [] });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await productApi.delete(id);
    toast.success('Deleted');
    load();
  };

  const startEdit = (p) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description || '', price: p.price, stock: p.stock, categoryId: p.categoryId || 1, imageUrls: [] });
    setShowForm(true);
  };

  const statusColor = (s) => s === 'Approved' ? 'bg-green-100 text-green-700' : s === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
        <button
          onClick={() => { setShowForm(true); setEditing(null); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          + Add Product
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-4">{editing ? 'Edit Product' : 'New Product'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input required type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea required rows={3} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input required type="number" min="0" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="col-span-2 flex gap-3">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                {editing ? 'Update' : 'Submit for Approval'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }}
                className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="animate-pulse space-y-3">{Array.from({length:3}).map((_,i)=><div key={i} className="h-16 bg-gray-200 rounded-xl"/>)}</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Product','Category','Price','Stock','Status','Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 text-sm">{p.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{p.categoryName}</td>
                  <td className="px-6 py-4 text-sm font-medium text-indigo-600">${p.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor(p.status)}`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(p)} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-12 text-gray-500">No products yet. Add your first product!</div>
          )}
        </div>
      )}
    </div>
  );
}