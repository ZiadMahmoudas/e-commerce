// src/pages/ForgotPasswordPage.jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../api'; // افترض إن عندك دالة هنا
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' }); // 'success' or 'error'
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = useMemo(() => {
    return email.length > 0 && /\S+@\S+\.\S+/.test(email);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setStatus({ type: null, message: '' }); // تفريغ الحالة القديمة

    try {
      // استبدل ده بالـ API بتاعك
      // const { data } = await authApi.forgotPassword({ email });
      
      // محاكاة لنجاح الطلب (للتجربة)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus({ 
        type: 'success', 
        message: "If an account exists, a password reset link has been sent to your email." 
      });
      setEmail(''); // تفريغ الحقل بعد النجاح
      toast.success('Reset link sent!');

    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-[#0b0f19] transition-colors duration-500 relative px-4">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.03] transition-opacity duration-500" 
           style={{
             backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             color: 'currentcolor'
           }}
      ></div>

      <div className="relative z-10 w-full max-w-[400px] bg-white dark:bg-[#141728] px-8 py-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-white/5 transition-colors duration-500">
        
        {/* Top Gradient Border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-gradient-to-r from-transparent via-[#00d2ff] to-[#8a2387] rounded-t-2xl"></div>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-[#8b85ff] rounded-xl mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
          </div>
          <h1 className="text-xl font-bold mb-1 text-gray-900 dark:text-white transition-colors duration-500">
            Forgot Password? 🔒
          </h1>
          <p className="text-[0.8rem] text-gray-500 dark:text-[#8b94a7] leading-relaxed transition-colors duration-500">
            Enter your email and we'll send you instructions to reset your password
          </p>
        </div>

        {/* Status Message (يظهر فوق الفيلد زي ما طلبت) */}
        {status.message && (
          <div className={`mb-4 p-3 rounded-lg text-[0.8rem] flex items-start gap-2 animate-[fadeSlideUp_0.3s_ease-out]
            ${status.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/30' : 
                                          'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30'}`}
          >
            {status.type === 'success' 
              ? <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              : <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
            }
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Group */}
          <div className="mb-5">
            <label className="block text-[0.8rem] mb-1.5 text-gray-700 dark:text-[#d1d5db] font-medium transition-colors duration-500">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({});
                if (status.message) setStatus({ type: null, message: '' }); // يخفي الرسالة لو اليوزر بدأ يكتب تاني
              }}
              placeholder="you@example.com"
              className={`w-full px-3 py-2.5 rounded-lg text-[0.9rem] outline-none transition-all duration-300
                bg-gray-50 dark:bg-[#1e2136] 
                text-gray-900 dark:text-white 
                border focus:ring-2 focus:ring-[#625df5]/20
                ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-[#2a2e45] focus:border-[#625df5]'}
              `}
            />
            {errors.email && <span className="text-[10px] text-red-500 mt-1 block animate-pulse">{errors.email}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`w-full py-2.5 rounded-lg text-[0.9rem] font-medium transition-all duration-300 flex justify-center items-center
              ${isFormValid 
                ? 'bg-[#625df5] hover:bg-[#736ef7] text-white shadow-[0_4px_15px_rgba(98,93,245,0.3)] cursor-pointer' 
                : 'bg-gray-300 dark:bg-[#2a2e45] text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-70'}
            `}
          >
            {loading ? (
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-[0.8rem] text-gray-500 dark:text-[#8b94a7] hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to login
          </Link>
        </div>

      </div>
    </div>
  );
}