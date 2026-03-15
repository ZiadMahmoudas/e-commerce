// src/layouts/DashboardLayout.jsx
import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSignalR } from '../hooks/useSignalR';
import { useTheme } from '../hooks/useTheme';

// (نفس قوائم الـ Vendor والـ Admin اللي عملناها قبل كدة)
const vendorNav = [
  { path: '/vendor', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', exact: true },
  { path: '/vendor/products', label: 'My Products', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
  { path: '/vendor/history', label: 'Sales History', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { path: '/vendor/analytics', label: 'Analytics', icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
];

const adminNav = [
  { path: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', exact: true },
  { path: '/admin/vendors', label: 'Vendor Approvals', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { path: '/admin/products', label: 'Product Approvals', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { path: '/admin/permissions', label: 'Permissions', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
];

export default function DashboardLayout({ role }) {
  const { user, token, logout } = useAuthStore();
  const { notifications } = useSignalR(token);
  const { theme, setTheme } = useTheme(); 
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = role === 'vendor' ? vendorNav : adminNav;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // حالة لفتح وقفل صندوق المحادثة
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path);
  const toggleDropdown = (name) => setActiveDropdown(activeDropdown === name ? null : name);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] flex overflow-hidden font-sans transition-colors duration-300">
      
      {/* Overlay للموبايل والـ Dropdowns */}
      {(isMobileMenuOpen || activeDropdown) && (
        <div onClick={() => { setIsMobileMenuOpen(false); setActiveDropdown(null); }} className="fixed inset-0 z-40 bg-black/50 lg:bg-transparent transition-opacity" />
      )}

      {/* ==================== Sidebar ==================== */}
      {/* (نفس كود السايد بار من غير تغيير عشان شغال بيرفكت) */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-[#141728] border-r border-gray-200 dark:border-[#2a2e45] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col shadow-2xl lg:shadow-none
          ${isMobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}
          ${isSidebarOpen ? 'lg:w-64' : 'lg:w-20'}
        `}>
        {/* Header Logo & Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-[#2a2e45] shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 shrink-0"><path d="M12 21.5L2 10.5L7 3H17L22 10.5L12 21.5Z" fill="#8b85ff"/><path d="M12 21.5L2 10.5L12 14L22 10.5L12 21.5Z" fill="#625df5"/></svg>
            <span className={`text-gray-900 dark:text-white font-bold text-lg whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen || isMobileMenuOpen ? 'opacity-100' : 'opacity-0 hidden lg:block'}`}>
              RePriceMax
            </span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-gray-500 hover:text-red-500 dark:text-[#8b94a7] dark:hover:text-red-400 transition-colors bg-gray-100 dark:bg-[#1e2136] rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden lg:block text-gray-500 dark:text-[#8b94a7] hover:text-gray-900 dark:hover:text-white p-1 rounded-md transition-colors">
            <svg className={`w-5 h-5 transition-transform duration-300 ${!isSidebarOpen && 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-hide">
          {navItems.map((item) => {
            const active = isActive(item.path, item.exact);
            return (
              <Link key={item.path} to={item.path} title={!isSidebarOpen ? item.label : ""}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                  ${active ? 'bg-indigo-50 dark:bg-[#0b0f19] text-indigo-600 dark:text-[#00d2ff] font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-6 before:bg-indigo-600 dark:before:bg-[#00d2ff] before:rounded-r-md' 
                           : 'text-gray-600 dark:text-[#8b94a7] hover:bg-gray-100 dark:hover:bg-[#1e2136] hover:text-gray-900 dark:hover:text-white font-medium'}
                `}>
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                <span className={`whitespace-nowrap text-[0.9rem] transition-opacity duration-300 ${isSidebarOpen || isMobileMenuOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-gray-200 dark:border-[#2a2e45] space-y-1 shrink-0">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8b94a7] hover:bg-[#1e2136] hover:text-white transition-colors" title={!isSidebarOpen ? "Back to Store" : ""}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className={`whitespace-nowrap font-medium text-[0.9rem] transition-opacity duration-300 ${isSidebarOpen || isMobileMenuOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>Back to Store</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8b94a7] hover:bg-[#1e2136] hover:text-white transition-colors" title={!isSidebarOpen ? "Settings" : ""}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className={`whitespace-nowrap font-medium text-[0.9rem] transition-opacity duration-300 ${isSidebarOpen || isMobileMenuOpen ? 'opacity-100' : 'lg:opacity-0 lg:hidden'}`}>Settings</span>
          </Link>
        </div>
      </aside>

      {/* ==================== Main Content ==================== */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
        
        {/* Top Header (نفس الهيدر المظبوط بالظبط) */}
        <header className="h-16 bg-white dark:bg-[#141728] border-b border-gray-200 dark:border-[#2a2e45] flex items-center justify-between px-4 lg:px-6 shrink-0 z-30 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-gray-500 dark:text-[#8b94a7] hover:text-indigo-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="relative w-48 sm:w-64 md:w-96 hidden sm:block">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#8b94a7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search (Ctrl+/)" className="w-full bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-white border border-gray-200 dark:border-[#2a2e45] rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors" />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-gray-500 dark:text-[#8b94a7]">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#1e2136] rounded-full transition-colors hidden sm:block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
            </button>

            {/* Theme Dropdown */}
            <div className="relative">
              <button onClick={() => toggleDropdown('theme')} className="p-2 hover:bg-gray-100 dark:hover:bg-[#1e2136] rounded-full transition-colors">
                {theme === 'light' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                {theme === 'dark' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
                {theme === 'system' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
              </button>
              {activeDropdown === 'theme' && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#1e2136] rounded-xl shadow-lg border border-gray-100 dark:border-[#2a2e45] py-2 z-50 animate-[fadeSlideUp_0.2s_ease-out]">
                  {['light', 'dark', 'system'].map(t => (
                     <button key={t} onClick={() => { setTheme(t); setActiveDropdown(null); }} className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-[#141728] ${theme === t ? 'text-indigo-600 dark:text-[#8b85ff] font-bold' : 'text-gray-700 dark:text-white'}`}><span className="capitalize">{t}</span></button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button onClick={() => toggleDropdown('notif')} className="p-2 hover:bg-gray-100 dark:hover:bg-[#1e2136] rounded-full transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                {notifications.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
              </button>
              {activeDropdown === 'notif' && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1e2136] rounded-xl shadow-2xl border border-gray-100 dark:border-[#2a2e45] overflow-hidden z-50 animate-[fadeSlideUp_0.2s_ease-out]">
                  <div className="p-4 border-b border-gray-100 dark:border-[#2a2e45] flex justify-between items-center bg-gray-50 dark:bg-[#141728]">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    <svg className="w-4 h-4 text-gray-400 dark:text-[#8b94a7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="p-8 text-center text-sm text-gray-500 dark:text-[#8b94a7]">
                    No new notifications!
                  </div>
                  <div className="p-3 border-t border-gray-100 dark:border-[#2a2e45] bg-gray-50 dark:bg-[#141728]">
                    <button className="w-full py-2.5 bg-[#1797e8] hover:bg-[#127bbd] text-white rounded-lg text-sm font-medium transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-px h-6 bg-gray-200 dark:bg-[#2a2e45] hidden sm:block mx-1"></div>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button onClick={() => toggleDropdown('profile')} className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-[#1e2136] rounded-full transition-colors focus:outline-none">
                <div className="relative">
                  <img src={`https://ui-avatars.com/api/?name=${user?.fullName || 'Admin'}&background=8b85ff&color=fff`} alt="Profile" className="w-8 h-8 rounded-full border-2 border-white dark:border-[#141728] shadow-sm" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-white dark:border-[#141728] rounded-full"></span>
                </div>
              </button>
              {activeDropdown === 'profile' && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1e2136] rounded-xl shadow-2xl border border-gray-100 dark:border-[#2a2e45] py-1 z-50 animate-[fadeSlideUp_0.2s_ease-out]">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-[#2a2e45] flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${user?.fullName || 'Admin'}&background=8b85ff&color=fff`} className="w-10 h-10 rounded-full" alt="Avatar"/>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[120px]">{user?.fullName || 'Admin User'}</p>
                      <p className="text-[10px] text-gray-500 dark:text-[#8b94a7] truncate">Roles.{role === 'vendor' ? 'Vendor' : 'OrgAdmin'}</p>
                    </div>
                  </div>
                  <div className="py-2 px-2 space-y-1">
                    <Link to="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-[#d1d5db] hover:bg-gray-50 dark:hover:bg-[#2a2e45] rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> My Team</Link>
                    <Link to="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-[#d1d5db] hover:bg-gray-50 dark:hover:bg-[#2a2e45] rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Settings</Link>
                    <Link to="#" className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-[#d1d5db] hover:bg-gray-50 dark:hover:bg-[#2a2e45] rounded-lg transition-colors">
                      <div className="flex items-center gap-3"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> Invoices</div>
                      <span className="bg-[#ff4a4a] text-white text-[10px] font-bold px-2 py-0.5 rounded">0</span>
                    </Link>
                    <div className="h-px bg-gray-100 dark:bg-[#2a2e45] my-1"></div>
                    <Link to="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-[#d1d5db] hover:bg-gray-50 dark:hover:bg-[#2a2e45] rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Pricing</Link>
                    <Link to="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-[#d1d5db] hover:bg-gray-50 dark:hover:bg-[#2a2e45] rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Help</Link>
                  </div>
                  <div className="px-2 pb-2">
                    <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center justify-center gap-2 py-2 mt-1 bg-[#ff4a4a] hover:bg-[#e63e3e] text-white rounded-lg text-sm font-bold transition-colors">
                      Logout <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dashboard Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-transparent relative z-0 flex flex-col">
           {/* الشبكة الخلفية */}
           <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-[0.03] pointer-events-none" 
               style={{
                 backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
                 backgroundSize: '40px 40px',
                 color: 'currentColor'
               }}>
           </div>
           
           {/* الـ Outlet (محتوى الصفحة) */}
           <div key={location.pathname} className="page-transition flex-grow">
             <Outlet />
           </div>

           {/* الفوتر الجديد في آخر الـ Main Content */}
           <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-[#2a2e45] flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-[#8b94a7]">
              <p>© 2026, made with <span className="text-red-500">❤️</span> by Pixinvent</p>
              <a href="#" className="text-[#00d2ff] hover:underline mt-2 sm:mt-0">Documentation</a>
           </footer>
        </main>

        {/* ==================== Floating Chat Box ==================== */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {/* نافذة المحادثة المفتوحة */}
          {isChatOpen && (
             <div className="mb-4 w-80 bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-96 animate-[fadeSlideUp_0.2s_ease-out]">
                <div className="bg-[#a855f7] p-4 text-white flex justify-between items-center shadow-md z-10">
                   <div className="flex items-center gap-2">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                     <h3 className="font-bold text-sm">Support Chat</h3>
                   </div>
                   <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="flex-1 p-4 text-gray-500 dark:text-[#8b94a7] text-sm flex flex-col justify-center items-center text-center bg-gray-50 dark:bg-[#0b0f19]">
                   <svg className="w-12 h-12 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                   <p>How can we help you today?</p>
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-[#2a2e45] bg-white dark:bg-[#1e2136]">
                   <input type="text" placeholder="Type a message..." className="w-full bg-gray-100 dark:bg-[#0b0f19] border border-gray-200 dark:border-[#2a2e45] rounded-xl px-4 py-2 text-gray-900 dark:text-white outline-none focus:border-[#a855f7] transition-colors text-sm" />
                </div>
             </div>
          )}
          
          {/* زر الشات الدائري/المربع (زى الصورة) */}
          <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-14 h-14 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-[1rem] flex items-center justify-center shadow-[0_4px_20px_rgba(168,85,247,0.4)] transition-all duration-300 hover:-translate-y-1 focus:outline-none">
             {isChatOpen ? (
               <svg className="w-6 h-6 animate-[fadeSlideUp_0.2s_ease-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             ) : (
               <svg className="w-6 h-6 animate-[fadeSlideUp_0.2s_ease-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
             )}
          </button>
        </div>

      </div>
    </div>
  );
}