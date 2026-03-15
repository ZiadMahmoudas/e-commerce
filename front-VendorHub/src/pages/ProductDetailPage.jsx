import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productApi, orderApi, favoriteApi } from '../api/index'; // تأكد من الـ imports حسب مشروعك
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    // محاكاة جلب البيانات، أو استخدم הـ API بتاعك الفعلي
    Promise.all([
      productApi.getById(id),
      productApi.getReviews(id)
    ])
    .then(([pd, rv]) => {
      if (pd?.data?.success) setProduct(pd.data.data);
      if (rv?.data?.success) setReviews(rv.data.data);
    })
    .catch((err) => {
      console.error("Error fetching product data:", err);
      // في حالة الفشل نضع داتا وهمية لغرض العرض في هذا الكود
      setProduct({
         id: id,
         title: 'Apple iPhone 15 Pro Max (256GB)',
         vendorId: 'tech-hub',
         vendorName: 'TechHub Egypt',
         categoryName: 'Electronics',
         price: 1199,
         oldPrice: 1299,
         averageRating: 4.8,
         reviewCount: 1245,
         stock: 12,
         viewCount: 45,
         description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system. Experience the next level of mobile performance.',
         imageUrls: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80']
      });
      setReviews([
         { id: 1, customerName: 'Ziad Mahmoud', rating: 5, comment: 'Amazing phone! The titanium finish is gorgeous.', createdAt: '2026-03-10T10:00:00Z' },
         { id: 2, customerName: 'Ahmed Khaled', rating: 4, comment: 'Great performance, but the battery life could be slightly better.', createdAt: '2026-03-12T14:30:00Z' }
      ]);
    })
    .finally(() => setLoading(false));
  }, [id]);

  const handleBuy = async () => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'Customer') { toast.error('Only customers can purchase.'); return; }
    
    setBuyLoading(true);
    try {
      // const { data } = await orderApi.place({ items: [{ productId: parseInt(id), quantity }] });
      await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة
      toast.success('Order placed successfully! 🎉');
      setProduct((p) => ({ ...p, stock: p.stock - quantity }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Purchase failed');
    } finally {
      setBuyLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!user) { navigate('/login'); return; }
    // await favoriteApi.toggle(id);
    toast.success('Added to favorites! ❤️');
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    
    setSubmittingReview(true);
    try {
      // const { data } = await productApi.submitReview(id, review);
      await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة
      toast.success('Review submitted!');
      // تحديث مصفوفة الريفيوز
      setReviews([{ id: Date.now(), customerName: user.fullName || 'You', rating: review.rating, comment: review.comment, createdAt: new Date().toISOString() }, ...reviews]);
      setReview({ rating: 5, comment: '' }); // إعادة تعيين الفورم
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-[#0b0f19] py-12 px-4 transition-colors duration-500">
        <div className="max-w-6xl mx-auto bg-white dark:bg-[#141728] rounded-2xl p-8 shadow-sm animate-pulse border border-gray-200 dark:border-[#2a2e45]">
           <div className="h-96 bg-gray-200 dark:bg-[#1e2136] rounded-xl mb-6" />
           <div className="h-8 bg-gray-200 dark:bg-[#1e2136] rounded w-1/2 mb-4" />
           <div className="h-4 bg-gray-200 dark:bg-[#1e2136] rounded w-1/4" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0b0f19] transition-colors duration-500 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h2>
        <p className="text-gray-500 dark:text-[#8b94a7] mb-6">The product you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/products')} className="bg-[#625df5] hover:bg-[#736ef7] text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_4px_15px_rgba(98,93,245,0.3)]">Back to Products</button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-[#0b0f19] py-8 md:py-12 transition-colors duration-500 relative">
      
      {/* شبكة الخلفية */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`, backgroundSize: '40px 40px', color: 'currentcolor' }}></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* زر الرجوع */}
        <button onClick={() => navigate(-1)} className="text-sm font-medium text-gray-500 dark:text-[#8b94a7] hover:text-[#625df5] dark:hover:text-[#8b85ff] flex items-center gap-2 transition-colors w-fit mb-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           Back
        </button>

        {/* ─── Product Main Section ─── */}
        <div className="bg-white dark:bg-[#141728] rounded-3xl border border-gray-200 dark:border-[#2a2e45] shadow-sm overflow-hidden flex flex-col md:flex-row transition-colors duration-500 relative">
          
          {/* Left: Image */}
          <div className="md:w-1/2 bg-gray-100 dark:bg-[#1e2136] relative min-h-[350px] md:min-h-[500px] flex items-center justify-center">
            {product.imageUrls?.[0] ? (
              <img src={product.imageUrls[0]} alt={product.title} className="w-full h-full object-cover absolute inset-0" />
            ) : (
              <svg className="w-24 h-24 text-gray-300 dark:text-[#2a2e45]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2 p-8 lg:p-12 flex flex-col">
            
            {/* Category & Vendor */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
               <span className="bg-indigo-50 dark:bg-[#1e2136] text-indigo-600 dark:text-[#d1d5db] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border border-indigo-100 dark:border-[#2a2e45]">
                 {product.categoryName}
               </span>
               <Link to={`/store/${product.vendorId}`} className="inline-flex items-center gap-1.5 text-sm text-[#625df5] dark:text-[#8b85ff] font-bold uppercase tracking-wider hover:underline">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                 {product.vendorName}
               </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              {product.title}
            </h1>

            {/* Price & Rating */}
            <div className="flex flex-wrap items-end gap-6 mb-6 pb-6 border-b border-gray-100 dark:border-[#2a2e45]">
              <div className="flex items-end gap-3">
                 <span className="text-4xl font-black text-[#625df5] dark:text-white">${product.price.toFixed(2)}</span>
                 {product.oldPrice && <span className="text-lg text-gray-400 line-through mb-1 font-medium">${product.oldPrice.toFixed(2)}</span>}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-[#8b94a7] mb-1">
                 <span className="flex items-center text-yellow-500 mr-1.5">
                   {'★'.repeat(Math.round(product.averageRating))}{'☆'.repeat(5 - Math.round(product.averageRating))}
                 </span>
                 <span>({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert prose-sm text-gray-600 dark:text-[#8b94a7] mb-8 leading-relaxed">
               <p>{product.description}</p>
            </div>

            {/* Stats (Views & Stock) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 px-3 py-1.5 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {product.stock} in stock
              </div>
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 px-3 py-1.5 rounded-lg">
                <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                {product.viewCount} viewing right now
              </div>
            </div>

            {/* Actions (Qty + Buy + Fav) */}
            <div className="mt-auto">
              {product.stock > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-[#d1d5db]">Quantity:</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="bg-gray-50 dark:bg-[#1e2136] text-gray-900 dark:text-white border border-gray-200 dark:border-[#2a2e45] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#625df5] transition-colors cursor-pointer appearance-none w-24 text-center"
                    >
                      {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={handleBuy}
                      disabled={buyLoading}
                      className="flex-1 bg-[#625df5] hover:bg-[#736ef7] disabled:bg-[#2a2e45] disabled:text-gray-400 text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-[0_4px_15px_rgba(98,93,245,0.3)] hover:shadow-[0_6px_20px_rgba(98,93,245,0.5)] flex items-center justify-center gap-2"
                    >
                      {buyLoading ? 'Processing...' : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                          Buy Now
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleFavorite}
                      className="w-14 h-[52px] bg-gray-50 hover:bg-red-50 dark:bg-[#1e2136] dark:hover:bg-red-500/10 text-gray-500 hover:text-red-500 dark:text-[#8b94a7] dark:hover:text-red-400 rounded-xl flex items-center justify-center transition-colors border border-gray-200 dark:border-[#2a2e45] hover:border-red-200 dark:hover:border-red-500/30"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 px-6 py-4 rounded-xl text-center font-bold text-lg">
                  Out of Stock
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ─── Reviews Section ─── */}
        <div className="bg-white dark:bg-[#141728] rounded-3xl border border-gray-200 dark:border-[#2a2e45] shadow-sm p-8 lg:p-12 transition-colors duration-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            Customer Reviews <span className="text-[#625df5] text-lg">({reviews.length})</span>
          </h2>

          {/* Submit review (Customer only) */}
          {user?.role === 'Customer' && (
            <form onSubmit={handleReview} className="mb-10 p-6 bg-gray-50 dark:bg-[#1e2136] border border-gray-200 dark:border-[#2a2e45] rounded-2xl space-y-4 transition-colors">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">Write a Review</h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#d1d5db] mb-1.5">Rating</label>
                  <select
                    value={review.rating}
                    onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
                    className="w-full bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#625df5]"
                  >
                    {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} ★</option>)}
                  </select>
                </div>
                <div className="flex-[3]">
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#d1d5db] mb-1.5">Comment</label>
                  <textarea
                    rows={1}
                    placeholder="Share your experience..."
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    className="w-full bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#625df5]/20 focus:border-[#625df5] resize-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <button
                  type="submit" 
                  disabled={submittingReview || !review.comment.trim()}
                  className="bg-[#625df5] hover:bg-[#736ef7] disabled:bg-[#2a2e45] disabled:text-gray-400 text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
                >
                  {submittingReview ? 'Submitting...' : 'Post Review'}
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="text-center py-12">
               <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-[#2a2e45] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
               <p className="text-gray-500 dark:text-[#8b94a7] font-medium">No reviews yet. Be the first to review this product!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="bg-gray-50 dark:bg-[#1e2136] border border-gray-100 dark:border-[#2a2e45] rounded-2xl p-6 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#625df5] to-[#00d2ff] flex items-center justify-center text-white font-bold shadow-sm">
                        {r.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white block text-sm">{r.customerName}</span>
                        <span className="text-xs text-gray-500 dark:text-[#8b94a7]">{new Date(r.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#141728] px-2 py-1 rounded border border-gray-200 dark:border-[#2a2e45] flex items-center gap-1 shadow-sm">
                       <span className="text-yellow-500 text-xs">★</span>
                       <span className="text-gray-900 dark:text-white text-xs font-bold">{r.rating}</span>
                    </div>
                  </div>
                  {r.comment && <p className="text-gray-600 dark:text-[#d1d5db] text-sm leading-relaxed mt-2">{r.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}