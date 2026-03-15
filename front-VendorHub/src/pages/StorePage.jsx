import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

const MOCK_VENDORS = [
  { id: 'amazon-eg', name: 'Amazon Prime Store', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=150&q=80', cover: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=1200&q=80', rating: 4.9, productsCount: '15k+', tagline: 'Everything from A to Z with prime delivery.', categories: ['Electronics', 'Home', 'Fashion'] },
  { id: 'tech-hub', name: 'TechHub Egypt', logo: 'https://images.unsplash.com/photo-1531297172864-822d103328ce?w=150&q=80', cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80', rating: 4.7, productsCount: '1.2k', tagline: 'Top tier laptops, PCs, and gaming gears.', categories: ['Computers', 'Gaming'] },
  { id: 'nike-official', name: 'Nike Official', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80', cover: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80', rating: 4.8, productsCount: '340', tagline: 'Just Do It. Premium sportswear and sneakers.', categories: ['Sports', 'Fashion'] }
];

const MOCK_PRODUCTS = [
  { id: 1, vendorId: 'tech-hub', title: 'Apple iPhone 15 Pro Max (256GB)', vendor: 'TechHub Egypt', brand: 'Apple', category: 'Electronics', price: 1199, oldPrice: 1299, rating: 4.8, reviews: 1245, stock: 12, badge: 'hot', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80' },
  { id: 2, vendorId: 'amazon-eg', title: 'Sony WH-1000XM5 Headphones', vendor: 'Amazon Prime Store', brand: 'Sony', category: 'Electronics', price: 348, oldPrice: 399, rating: 4.9, reviews: 891, stock: 45, badge: 'sale', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80' },
  { id: 3, vendorId: 'amazon-eg', title: 'Echo Dot (5th Gen) Smart speaker', vendor: 'Amazon Prime Store', brand: 'Amazon', category: 'Smart Home', price: 49, oldPrice: null, rating: 4.7, reviews: 5432, stock: 120, badge: 'new', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80' },
  { id: 4, vendorId: 'tech-hub', title: 'Logitech G Pro X Superlight', vendor: 'TechHub Egypt', brand: 'Logitech', category: 'Gaming', price: 129, oldPrice: 159, rating: 4.6, reviews: 342, stock: 8, badge: null, image: 'https://images.unsplash.com/photo-1527443154391-4208ce8d56ae?w=500&q=80' },
  { id: 5, vendorId: 'amazon-eg', title: 'Samsung 55" QLED 4K Smart TV', vendor: 'Amazon Prime Store', brand: 'Samsung', category: 'Electronics', price: 799, oldPrice: 899, rating: 4.5, reviews: 211, stock: 5, badge: 'hot', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80' },
];

function ProductCard({ product }) {
  return (
    <div className="group relative bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] flex flex-col h-full">
      <div className="h-48 sm:h-52 bg-gray-100 dark:bg-[#1e2136] relative overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm ${product.badge === 'hot' ? 'bg-red-500 text-white' : product.badge === 'sale' ? 'bg-yellow-400 text-gray-900' : 'bg-green-500 text-white'}`}>
            {product.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <button className="w-9 h-9 bg-white/90 backdrop-blur text-gray-700 rounded-full flex items-center justify-center shadow-md hover:text-red-500 hover:bg-white hover:scale-110 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></button>
          <Link to={`/products/${product.id}`} className="w-9 h-9 bg-white/90 backdrop-blur text-gray-700 rounded-full flex items-center justify-center shadow-md hover:text-[#625df5] hover:bg-white hover:scale-110 transition-all">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </Link>
        </div>
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-[#625df5] dark:text-[#8b85ff] uppercase tracking-wide mb-1.5 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
          {product.brand}
        </p>
        <Link to={`/products/${product.id}`} className="font-semibold text-[0.95rem] text-gray-900 dark:text-white leading-snug mb-2 line-clamp-2 hover:text-[#625df5] transition-colors">{product.title}</Link>
        <div className="flex items-center gap-1.5 text-xs mb-3">
          <span className="flex items-center text-yellow-400">★ <span className="ml-1 text-gray-700 dark:text-gray-300 font-medium">{product.rating}</span></span>
          <span className="text-gray-400 dark:text-gray-500">({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-900 dark:text-white">${product.price}</span>
            {product.oldPrice && <span className="text-[10px] text-gray-400 line-through">${product.oldPrice}</span>}
          </div>
          <button className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 dark:bg-[#1e2136] hover:bg-[#625df5] hover:text-white dark:hover:bg-[#625df5] text-gray-600 dark:text-[#d1d5db] rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"><svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg></button>
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  const { id } = useParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState([]);
  
  const maxLimit = 5000;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const store = MOCK_VENDORS.find(v => v.id === id);
  const allStoreProducts = useMemo(() => MOCK_PRODUCTS.filter(p => p.vendorId === id), [id]);

  const availableCategories = useMemo(() => ['All', ...new Set(allStoreProducts.map(p => p.category))], [allStoreProducts]);
  const availableBrands = useMemo(() => [...new Set(allStoreProducts.map(p => p.brand))], [allStoreProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = [...allStoreProducts];

    if (searchQuery) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }
    filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

    if (sortBy === 'price_low') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_high') filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [allStoreProducts, searchQuery, selectedCategory, selectedBrands, minPrice, maxPrice, sortBy]);

  const handleMinChange = (e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 10));
  const handleMaxChange = (e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 10));
  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };
  const clearFilters = () => {
    setSearchQuery(''); setSortBy('default'); setSelectedCategory('All'); setSelectedBrands([]); setMinPrice(0); setMaxPrice(5000);
  };

  const rangeThumbStyle = "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#625df5] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer";

  if (!store) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 dark:bg-[#0b0f19] transition-colors duration-500 text-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Store Not Found</h2>
          <p className="text-gray-500 dark:text-[#8b94a7] mb-6">The store you are looking for does not exist.</p>
          <Link to="/" className="bg-[#625df5] text-white px-6 py-2.5 rounded-xl font-medium">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-[#0b0f19] transition-colors duration-500 relative pb-16">
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`, backgroundSize: '40px 40px', color: 'currentcolor' }}></div>

      <div className="relative z-10 w-full bg-white dark:bg-[#141728] border-b border-gray-200 dark:border-[#2a2e45] shadow-sm pb-6 sm:pb-8">
        <div className="h-40 sm:h-48 md:h-72 w-full relative">
          <img src={store.cover} alt="Store Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute -top-12 sm:-top-16 border-4 border-white dark:border-[#141728] rounded-2xl bg-white dark:bg-[#1e2136] overflow-hidden shadow-lg w-24 h-24 sm:w-32 sm:h-32">
            <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="pt-14 sm:pt-20 md:pt-4 ml-0 md:ml-40 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{store.name}</h1>
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Verified
                </span>
              </div>
              <p className="text-gray-500 dark:text-[#8b94a7] text-xs sm:text-sm">{store.tagline}</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-700 dark:text-[#d1d5db]">
                <span className="flex items-center text-yellow-500 font-semibold bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded">★ {store.rating} Rating</span>
                <span className="flex items-center gap-1"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> {store.productsCount} Products</span>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-[#625df5] hover:bg-[#736ef7] text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_4px_15px_rgba(98,93,245,0.3)] flex items-center justify-center gap-2">
              Follow Store
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-2xl shadow-sm overflow-hidden transition-colors duration-500">
            
            <div className="p-5 border-b border-gray-100 dark:border-[#2a2e45] bg-gray-50 dark:bg-[#1e2136]">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-[#625df5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Store Filters
              </h3>
            </div>

            <div className="p-5 border-b border-gray-100 dark:border-[#2a2e45]">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Categories</h4>
              <div className="space-y-2">
                {availableCategories.map((cat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="radio" 
                        name="storeCategory"
                        id={`store-cat-${idx}`} 
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="peer appearance-none w-4 h-4 border rounded-full cursor-pointer transition-colors duration-300 bg-gray-50 dark:bg-[#1e2136] border-gray-300 dark:border-[#2a2e45] checked:bg-[#625df5] checked:border-[#625df5]" 
                      />
                      <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <label htmlFor={`store-cat-${idx}`} className="text-sm text-gray-600 dark:text-[#d1d5db] cursor-pointer hover:text-[#625df5] dark:hover:text-[#8b85ff] transition-colors">
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {availableBrands.length > 0 && (
              <div className="p-5 border-b border-gray-100 dark:border-[#2a2e45]">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Brands</h4>
                <div className="space-y-2">
                  {availableBrands.map((brand, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          id={`store-brand-${idx}`} 
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="peer appearance-none w-4 h-4 border rounded cursor-pointer transition-colors duration-300 bg-gray-50 dark:bg-[#1e2136] border-gray-300 dark:border-[#2a2e45] checked:bg-[#625df5] checked:border-[#625df5]" 
                        />
                        <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <label htmlFor={`store-brand-${idx}`} className="text-sm text-gray-600 dark:text-[#d1d5db] cursor-pointer hover:text-[#625df5] dark:hover:text-[#8b85ff] transition-colors">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-5">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-sm">Price Range</h4>
              <div className="flex items-center gap-2 mb-6">
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#8b94a7] text-xs">$</span>
                  <input type="number" value={minPrice} onChange={handleMinChange} className="w-full bg-gray-50 dark:bg-[#1e2136] border border-gray-200 dark:border-[#2a2e45] text-gray-900 dark:text-white rounded-lg pl-6 pr-1 py-1.5 text-xs focus:outline-none focus:border-[#625df5] transition-colors" />
                </div>
                <span className="text-gray-400 dark:text-[#8b94a7] text-xs">-</span>
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#8b94a7] text-xs">$</span>
                  <input type="number" value={maxPrice} onChange={handleMaxChange} className="w-full bg-gray-50 dark:bg-[#1e2136] border border-gray-200 dark:border-[#2a2e45] text-gray-900 dark:text-white rounded-lg pl-6 pr-1 py-1.5 text-xs focus:outline-none focus:border-[#625df5] transition-colors" />
                </div>
              </div>

              <div className="relative h-1.5 bg-gray-200 dark:bg-[#2a2e45] rounded-full mx-2">
                <div className="absolute h-full bg-[#625df5] rounded-full" style={{ left: `${(minPrice / maxLimit) * 100}%`, right: `${100 - (maxPrice / maxLimit) * 100}%` }}></div>
                <input type="range" min="0" max={maxLimit} value={minPrice} onChange={handleMinChange} className={`absolute w-full -top-1.5 h-1.5 appearance-none bg-transparent pointer-events-none ${rangeThumbStyle}`} />
                <input type="range" min="0" max={maxLimit} value={maxPrice} onChange={handleMaxChange} className={`absolute w-full -top-1.5 h-1.5 appearance-none bg-transparent pointer-events-none ${rangeThumbStyle}`} />
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col space-y-6">
          
          <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors duration-500">
            <div className="relative w-full sm:w-80">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full bg-gray-50 dark:bg-[#1e2136] text-gray-900 dark:text-white border border-gray-200 dark:border-[#2a2e45] rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#625df5] transition-colors shadow-sm" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-gray-500 dark:text-[#8b94a7] whitespace-nowrap">Sort:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full sm:w-auto bg-gray-50 dark:bg-[#1e2136] text-gray-900 dark:text-white border border-gray-200 dark:border-[#2a2e45] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#625df5] transition-colors cursor-pointer shadow-sm">
                <option value="default">Most Popular</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="flex-1 bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-2xl shadow-sm flex flex-col items-center justify-center py-20 text-center transition-colors">
              <div className="w-20 h-20 bg-gray-50 dark:bg-[#1e2136] rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gray-300 dark:text-[#2a2e45]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No matching products</h3>
              <p className="text-gray-500 dark:text-[#8b94a7] mt-1 mb-6 text-sm">Try removing some filters.</p>
              <button onClick={clearFilters} className="bg-[#625df5] hover:bg-[#736ef7] text-white px-6 py-2 rounded-xl text-sm font-medium transition-all">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}