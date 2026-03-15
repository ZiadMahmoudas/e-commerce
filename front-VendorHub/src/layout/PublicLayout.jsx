// src/layouts/PublicLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function PublicLayout() {
  const location = useLocation(); 

  // إخفاء الهيدر والفوتر في صفحات الأوث
  const isAuthPage = location.pathname === '/login' 
                  || location.pathname === '/register'
                  || location.pathname === '/forgot-password'
                  || location.pathname === '/reset-password';
                  
  const hideNavAndFooter = isAuthPage;

  return (
    // min-h-screen و flex-col عشان الفوتر ينزل تحت
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* عرض الهيدر فقط لو مش صفحة Auth */}
      {!hideNavAndFooter && <Header />}

      {/* المحتوى مع أنيميشن الانتقال */}
      <main className="flex-grow flex flex-col relative w-full h-full">
        <div key={location.pathname} className="page-transition flex-grow flex flex-col">
          <Outlet />
        </div>
      </main>

      {/* عرض الفوتر فقط لو مش صفحة Auth */}
      {!hideNavAndFooter && <Footer />}

    </div>
  );
}