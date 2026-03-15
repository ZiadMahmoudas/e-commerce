// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

// ─── Mock Data ───────────────────────────────────────
const MOCK_VENDORS = [
  { id: 'amazon-eg', name: 'Amazon Prime Store', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=150&q=80', cover: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=600&q=80', rating: 4.9, productsCount: '15k+', tagline: 'Everything from A to Z with prime delivery.', categories: ['Electronics', 'Home'] },
  { id: 'nike-official', name: 'Nike Official', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80', cover: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80', rating: 4.8, productsCount: '340', tagline: 'Just Do It. Premium sportswear and sneakers.', categories: ['Sports', 'Fashion'] },
  { id: 'tech-hub', name: 'TechHub Egypt', logo: 'https://images.unsplash.com/photo-1531297172864-822d103328ce?w=150&q=80', cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', rating: 4.7, productsCount: '1.2k', tagline: 'Top tier laptops, PCs, and gaming gears.', categories: ['Computers', 'Gaming'] },
  { id: 'zara-eg', name: 'Zara Outlet', logo: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&q=80', cover: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80', rating: 4.5, productsCount: '850', tagline: 'Trendy fashion and clothing for everyone.', categories: ['Clothing', 'Accessories'] },
];

const MOCK_PRODUCTS = [
  { id: 1, title: 'Apple iPhone 15 Pro Max (256GB) - Natural Titanium', vendor: 'TechHub Egypt', category: 'Electronics', price: 1199, oldPrice: 1299, rating: 4.8, reviews: 1245, stock: 12, badge: 'hot', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80' },
  { id: 2, title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', vendor: 'Amazon Prime Store', category: 'Electronics', price: 348, oldPrice: 399, rating: 4.9, reviews: 891, stock: 45, badge: 'sale', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80' },
  { id: 3, title: 'Nike Air Max Pulse Mens Shoes', vendor: 'Nike Official', category: 'Sports', price: 150, oldPrice: null, rating: 4.6, reviews: 432, stock: 88, badge: 'new', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { id: 4, title: 'Premium Oxford Cotton Button-Down Shirt', vendor: 'Zara Outlet', category: 'Clothing', price: 45, oldPrice: 65, rating: 4.3, reviews: 103, stock: 200, badge: 'sale', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80' },
];

// ─── Vendor Card Component ────────────────────────────────
function VendorCard({ vendor }) {
  return (
    <Link to={`/store/${vendor.id}`} className="group block bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-2xl transition-all duration-300 hover:shadow-xl hover:border-[#625df5] hover:-translate-y-1 overflow-hidden relative">
      <div className="h-28 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img src={vendor.cover} alt={`${vendor.name} cover`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-5 pt-1 relative">
        <div className="w-16 h-16 rounded-xl bg-white dark:bg-[#1e2136] p-1 border border-gray-200 dark:border-[#2a2e45] shadow-md absolute -top-8 left-5 overflow-hidden">
           <img src={vendor.logo} alt={vendor.name} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="mt-10">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-[#625df5] transition-colors line-clamp-1">{vendor.name}</h3>
          <p className="text-xs text-gray-500 dark:text-[#8b94a7] mt-1 line-clamp-1">{vendor.tagline}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-[#8b94a7] mt-3">
            <span className="flex items-center text-yellow-500 font-semibold bg-yellow-50 dark:bg-yellow-500/10 px-1.5 py-0.5 rounded">
              ★ {vendor.rating}
            </span>
            <span>•</span>
            <span className="font-medium">{vendor.productsCount} Products</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {vendor.categories.map(cat => (
              <span key={cat} className="px-2.5 py-1 bg-gray-100 dark:bg-[#1e2136] text-gray-600 dark:text-[#d1d5db] rounded-md text-[10px] font-semibold tracking-wide uppercase">{cat}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Product Card Component ───────────────────────────
function ProductCard({ product }) {
  return (
    <div className="group relative bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] flex flex-col h-full">
      <div className="h-52 bg-gray-100 dark:bg-[#1e2136] relative overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm ${product.badge === 'hot' ? 'bg-red-500 text-white' : product.badge === 'sale' ? 'bg-yellow-400 text-gray-900' : 'bg-green-500 text-white'}`}>
            {product.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <button className="w-9 h-9 bg-white/90 backdrop-blur text-gray-700 rounded-full flex items-center justify-center shadow-md hover:text-red-500 hover:bg-white hover:scale-110 transition-all" title="Add to Wishlist">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
          
          {/* هنا التعديل: بدل onView بنوجهه للصفحة */}
          <Link to={`/products/${product.id}`} className="w-9 h-9 bg-white/90 backdrop-blur text-gray-700 rounded-full flex items-center justify-center shadow-md hover:text-[#625df5] hover:bg-white hover:scale-110 transition-all" title="View Product">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </Link>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-[#625df5] dark:text-[#8b85ff] uppercase tracking-wide mb-1.5 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          {product.vendor}
        </p>
        <Link to={`/products/${product.id}`} className="font-semibold text-[0.95rem] text-gray-900 dark:text-white leading-snug mb-2 line-clamp-2 hover:text-[#625df5] dark:hover:text-[#8b85ff] transition-colors">
          {product.title}
        </Link>
        <div className="flex items-center gap-1.5 text-xs mb-3">
          <span className="flex items-center text-yellow-400">★ <span className="ml-1 text-gray-700 dark:text-gray-300 font-medium">{product.rating}</span></span>
          <span className="text-gray-400 dark:text-gray-500">({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-900 dark:text-white">${product.price}</span>
            {product.oldPrice && <span className="text-[10px] text-gray-400 line-through">${product.oldPrice}</span>}
          </div>
          <button className="w-10 h-10 bg-gray-100 dark:bg-[#1e2136] hover:bg-[#625df5] hover:text-white dark:hover:bg-[#625df5] text-gray-600 dark:text-[#d1d5db] rounded-full flex items-center justify-center transition-all duration-300 shadow-sm" title="Add to Cart">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main HomePage Component ───────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-[#0b0f19] transition-colors duration-500 relative pb-16">
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`, backgroundSize: '40px 40px', color: 'currentcolor' }}></div>

      <div className="relative z-10 w-full bg-white dark:bg-[#141728] border-b border-gray-200 dark:border-[#2a2e45] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#625df5] opacity-10 dark:opacity-[0.15] blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-[#1e2136] text-indigo-600 dark:text-[#8b85ff] border border-indigo-100 dark:border-[#2a2e45] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 animate-[fadeSlideUp_0.5s_ease-out]">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-[#8b85ff] animate-pulse"></span>
            Verified Vendors Marketplace
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 animate-[fadeSlideUp_0.6s_ease-out]">
            Shop directly from <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#625df5] via-[#00d2ff] to-[#8a2387]">Premium Brands & Stores</span>
          </h1>
          <p className="text-gray-500 dark:text-[#8b94a7] text-lg max-w-2xl mx-auto mb-8 animate-[fadeSlideUp_0.7s_ease-out]">
            Discover thousands of high-quality products. Every vendor is strictly vetted, ensuring a safe and premium shopping experience.
          </p>
          <div className="flex justify-center gap-4 animate-[fadeSlideUp_0.8s_ease-out]">
            <Link to="/products" className="bg-[#625df5] hover:bg-[#736ef7] text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-[0_4px_15px_rgba(98,93,245,0.3)] hover:shadow-[0_6px_20px_rgba(98,93,245,0.5)]">Start Shopping</Link>
            <Link to="/register" className="bg-white dark:bg-[#1e2136] text-gray-900 dark:text-white border border-gray-200 dark:border-[#2a2e45] hover:bg-gray-50 dark:hover:bg-[#2a2e45] px-8 py-3.5 rounded-xl font-semibold transition-all shadow-sm">Become a Vendor</Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-16 space-y-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Stores</h2>
              <p className="text-gray-500 dark:text-[#8b94a7] mt-1">Shop directly from official brands and trusted sellers</p>
            </div>
            <Link to="/vendors" className="hidden sm:flex text-[#625df5] hover:text-[#8b85ff] text-sm font-semibold items-center gap-1 transition-colors">View All Stores <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_VENDORS.map(vendor => <VendorCard key={vendor.id} vendor={vendor} />)}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Products</h2>
              <p className="text-gray-500 dark:text-[#8b94a7] mt-1">Items everyone is looking at right now</p>
            </div>
            <Link to="/products" className="hidden sm:flex text-[#625df5] hover:text-[#8b85ff] text-sm font-semibold items-center gap-1 transition-colors">Explore Market <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      </div>
    </div>
  );
}