import { useNavigate, Link } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    // الخلفية الرئيسية متوافقة مع الـ Dark/Light Mode
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b0f19] relative overflow-hidden px-4 transition-colors duration-500">
      
      {/* الشبكة الخلفية */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.03]" 
           style={{
             backgroundImage: `
                linear-gradient(currentColor 1px, transparent 1px),
                linear-gradient(90deg, currentColor 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px',
             color: 'currentcolor'
           }}
      ></div>

      {/* تأثير الإضاءة (Glow Effect) ورا رقم 404 في الدارك مود */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#625df5] rounded-full blur-[120px] opacity-20 dark:opacity-30 pointer-events-none animate-pulse"></div>

      <div className="relative z-10 text-center flex flex-col items-center animate-[fadeSlideUp_0.5s_ease-out]">
        
        {/* أيقونة تعبيرية (عدسة بحث مكسورة أو ضائعة) */}
        <div className="w-24 h-24 bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-3xl shadow-xl flex items-center justify-center mb-8 animate-[bounce_3s_infinite]">
          <svg className="w-12 h-12 text-indigo-500 dark:text-[#8b85ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>

        {/* رقم 404 بتدرج لوني */}
        <h1 className="text-[100px] md:text-[150px] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#625df5] via-[#00d2ff] to-[#8a2387] drop-shadow-lg mb-4">
          404
        </h1>
        
        {/* النصوص */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-[#8b94a7] max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed transition-colors">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* الأزرار */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* زر العودة للرئيسية */}
          <Link 
            to="/" 
            className="w-full sm:w-auto px-8 py-3.5 bg-[#625df5] hover:bg-[#736ef7] text-white rounded-xl font-medium transition-all duration-300 shadow-[0_4px_15px_rgba(98,93,245,0.3)] hover:shadow-[0_6px_20px_rgba(98,93,245,0.5)] flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>

          {/* زر الرجوع للصفحة السابقة */}
          <button 
            onClick={() => navigate(-1)} 
            className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-[#141728] hover:bg-gray-50 dark:hover:bg-[#1e2136] text-gray-700 dark:text-white border border-gray-200 dark:border-[#2a2e45] rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}