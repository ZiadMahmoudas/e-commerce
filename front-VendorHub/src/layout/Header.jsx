// src/components/Header.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../hooks/useTheme';
import { useSignalR } from '../hooks/useSignalR';

export default function Header() {
  const { user, token, logout } = useAuthStore();
  const { notifications } = useSignalR(token);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // إغلاق المنيو والموبايل ناف بار لما اللينك يتغير
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // إغلاق القوائم المنسدلة عند الضغط في أي مكان بره
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.role === 'Admin') return '/admin';
    if (user.role === 'Vendor') return '/vendor';
    return null; // Customer ملوش داشبورد، ليه بروفايل أو My Orders
  };

  const toggleDropdown = (name) => setActiveDropdown(activeDropdown === name ? null : name);

  // Links Array
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/store', label: 'store' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const getUserAvatar = () => {
    if (user?.avatarUrl) return user.avatarUrl;
    return `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=625df5&color=fff&bold=true`;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="w-8 h-8 bg-[#625df5] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white transition-colors duration-300">
              VendorHub
            </span>
          </Link>

          {/* 2. Center Nav Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === link.path 
                    ? 'text-[#625df5] dark:text-[#8b85ff]' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#625df5] dark:hover:text-[#8b85ff]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 3. Right side Actions */}
          <div className="flex items-center gap-4" ref={dropdownRef}>
            
            {/* Theme Toggle Dropdown */}
            <div className="relative hidden sm:block">
              <button onClick={() => toggleDropdown('theme')} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none">
                {theme === 'light' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                {theme === 'dark' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
                {theme === 'system' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
              </button>

              {activeDropdown === 'theme' && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#141728] rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 border border-gray-100 dark:border-[#2a2e45] py-2 z-50 animate-[fadeSlideUp_0.2s_ease-out]">
                  {['light', 'dark', 'system'].map(t => (
                     <button key={t} onClick={() => { setTheme(t); setActiveDropdown(null); }} className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${theme === t ? 'text-[#625df5] dark:text-[#8b85ff] font-semibold' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-50 dark:hover:bg-white/5`}>
                       <span className="capitalize">{t}</span>
                     </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Logic (Logged in vs Not Logged in) */}
            {user ? (
              <>
                {/* Heart / Favorites */}
                <Link to="/favorites" className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </Link>

                {/* Cart */}
                <Link to="/cart" className="p-2 text-gray-500 dark:text-gray-400 hover:text-[#625df5] dark:hover:text-[#8b85ff] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative pr-4 sm:pr-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  {/* Cart Badge - Example */}
                  <span className="absolute top-0 right-0 sm:-right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-800">2</span>
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button onClick={() => toggleDropdown('profile')} className="flex items-center gap-2 focus:outline-none ml-2">
                    <img 
                      src={getUserAvatar()} 
                      alt="User Avatar" 
                      className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-[#2a2e45] hover:border-[#625df5] transition-colors"
                    />
                  </button>
                  
                  {activeDropdown === 'profile' && (
                    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#141728] rounded-xl shadow-lg border border-gray-200 dark:border-[#2a2e45] py-2 z-50 animate-[fadeSlideUp_0.2s_ease-out]">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-[#2a2e45] mb-1">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.fullName}</p>
                        <p className="text-xs text-gray-500 dark:text-[#8b94a7] truncate">{user.email}</p>
                      </div>
                      
                      {getDashboardLink() && (
                        <Link to={getDashboardLink()} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1e2136] transition-colors">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                          Dashboard
                        </Link>
                      )}
                      
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1e2136] transition-colors">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        My Profile
                      </Link>
                      
                      <div className="h-px bg-gray-100 dark:bg-[#2a2e45] my-1"></div>
                      
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-3 ml-2">
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-[#625df5] dark:hover:text-[#8b85ff] font-medium text-sm transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-[#625df5] hover:bg-[#736ef7] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  Sign up
                </Link>
              </div>
            )}

            {/* Hamburger Menu Button with Middle Line Pull Animation */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden ml-2 p-2 text-gray-600 dark:text-gray-300 focus:outline-none relative w-10 h-10 flex items-center justify-center"
            >
              <div className="w-6 flex flex-col items-end gap-1.5 overflow-hidden">
                <span className={`w-full h-0.5 bg-current rounded transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                {/* دي العصاية اللي بتتسحب وتختفي */}
                <span className={`w-full h-0.5 bg-current rounded transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-8 opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current rounded transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-16 left-0 w-full bg-white dark:bg-[#141728] border-b border-gray-200 dark:border-[#2a2e45] overflow-hidden transition-all duration-300 ease-in-out shadow-lg z-40 ${isMobileMenuOpen ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="flex flex-col px-4 space-y-2">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1e2136] font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {!user && (
             <div className="pt-4 mt-2 border-t border-gray-100 dark:border-[#2a2e45] flex flex-col gap-3">
                <Link to="/login" className="w-full text-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#2a2e45] font-medium transition-colors">Log in</Link>
                <Link to="/register" className="w-full text-center px-4 py-3 rounded-lg bg-[#625df5] text-white font-medium transition-colors">Sign up</Link>
             </div>
          )}
        </div>
      </div>
    </nav>
  );
}