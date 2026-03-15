// import { useState } from 'react';
// import { Outlet, Link, useLocation } from 'react-router-dom';

// export default function VendorLayout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const location = useLocation();

//   // اللينكات اللي في الـ Sidebar زي الصورة
//   const menuItems = [
//     { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/vendor' },
//     { name: 'Onboarding', icon: 'M13 10V3L4 14h7v7l9-11h-7z', path: '/vendor/onboarding' },
//     { name: 'Marketplaces', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', path: '/vendor/marketplaces' },
//     { name: 'Listings', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', path: '/vendor/listings' },
//     { name: 'Strategies', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', path: '/vendor/strategies' },
//     { name: 'Analytics', icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', path: '/vendor/analytics' },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0b0f19] flex overflow-hidden">
      
//       {/* Sidebar */}
//       <aside 
//         className={`bg-[#141728] border-r border-[#2a2e45] transition-all duration-300 ease-in-out flex flex-col
//           ${isSidebarOpen ? 'w-64' : 'w-20'}`}
//       >
//         {/* Sidebar Header & Logo */}
//         <div className="h-16 flex items-center justify-between px-4 border-b border-[#2a2e45] shrink-0">
//           <div className="flex items-center gap-3 overflow-hidden">
//             <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 shrink-0">
//               <path d="M12 21.5L2 10.5L7 3H17L22 10.5L12 21.5Z" fill="#8b85ff"/>
//               <path d="M12 21.5L2 10.5L12 14L22 10.5L12 21.5Z" fill="#625df5"/>
//             </svg>
//             <span className={`text-white font-bold text-lg whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
//               RePriceMax
//             </span>
//           </div>
          
//           {/* Toggle Button */}
//           <button 
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="text-[#8b94a7] hover:text-white p-1 rounded-md transition-colors"
//           >
//             <svg className={`w-5 h-5 transition-transform duration-300 ${!isSidebarOpen && 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
//           {menuItems.map((item) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link 
//                 key={item.name} 
//                 to={item.path}
//                 className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative
//                   ${isActive ? 'bg-[#0b0f19] text-[#00d2ff] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-[#00d2ff] before:rounded-r-md' 
//                              : 'text-[#8b94a7] hover:bg-[#1e2136] hover:text-white'}
//                 `}
//                 title={!isSidebarOpen ? item.name : ""}
//               >
//                 <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
//                 </svg>
//                 <span className={`whitespace-nowrap font-medium text-[0.9rem] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
//                   {item.name}
//                 </span>
//               </Link>
//             )
//           })}
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
//         {/* Top Header */}
//         <header className="h-16 bg-[#141728] border-b border-[#2a2e45] flex items-center justify-between px-6 shrink-0 z-10">
//           {/* Search Bar */}
//           <div className="relative w-96">
//             <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b94a7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             <input 
//               type="text" 
//               placeholder="Search (Ctrl+/)" 
//               className="w-full bg-[#0b0f19] text-white border border-[#2a2e45] rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#625df5] transition-colors"
//             />
//           </div>

//           {/* Right Actions */}
//           <div className="flex items-center gap-4 text-[#8b94a7]">
//             <button className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg></button>
//             <button className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg></button>
//             <button className="hover:text-white transition-colors relative">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
//               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 ml-2 cursor-pointer border border-[#2a2e45]"></div>
//           </div>
//         </header>

//         {/* Dashboard Content area (with custom scrollbar) */}
//         <main className="flex-1 overflow-y-auto p-6 bg-transparent relative z-0">
//            {/* الشبكة الخلفية الممتدة في المحتوى */}
//            <div className="absolute inset-0 z-[-1] opacity-10 pointer-events-none" 
//                style={{
//                  backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
//                  backgroundSize: '40px 40px',
//                  color: 'white'
//                }}>
//            </div>
           
//            <div key={location.pathname} className="page-transition h-full">
//              <Outlet />
//            </div>
//         </main>
//       </div>
//     </div>
//   )
// }