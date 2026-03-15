// src/pages/ResetPasswordPage.jsx
import { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '../api';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  // لاستخراج التوكن من الرابط لو الباك إند بيبعته في الـ URL (مثال: ?token=xyz)
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 

  const validateForm = () => {
    const newErrors = {};
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Min 8 chars required';

    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = useMemo(() => {
    return (
      form.password.length >= 8 &&
      form.password === form.confirmPassword
    );
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // ابعت الـ Token اللي جاي من الإيميل مع الباسورد الجديد
      // await authApi.resetPassword({ token, newPassword: form.password });
      
      // محاكاة
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Password reset successfully!');
      navigate('/login'); // بيرجعه على اللوجين أوتوماتيك
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password. Link might be expired.');
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
           <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h1 className="text-xl font-bold mb-1 text-gray-900 dark:text-white transition-colors duration-500">
            Set New Password
          </h1>
          <p className="text-[0.8rem] text-gray-500 dark:text-[#8b94a7] leading-relaxed transition-colors duration-500">
            Your new password must be different from previous used passwords.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* New Password Group */}
          <div className="mb-4">
            <label className="block text-[0.8rem] mb-1.5 text-gray-700 dark:text-[#d1d5db] font-medium transition-colors duration-500">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: null });
                  if (form.confirmPassword && e.target.value !== form.confirmPassword) {
                    setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
                  } else {
                    setErrors(prev => ({ ...prev, confirmPassword: null }));
                  }
                }}
                placeholder="Min 8 characters"
                className={`w-full pl-3 pr-10 py-2.5 rounded-lg text-[0.9rem] outline-none transition-all duration-300
                  bg-gray-50 dark:bg-[#1e2136] 
                  text-gray-900 dark:text-white 
                  border focus:ring-2 focus:ring-[#625df5]/20
                  ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-[#2a2e45] focus:border-[#625df5]'}
                `}
              />
              {/* Eye Button Toggle (Smooth) */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full flex items-center justify-center text-gray-400 dark:text-[#8b94a7] hover:text-[#625df5] dark:hover:text-[#8b85ff] transition-colors">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
                  <line x1="2" y1="2" x2="22" y2="22" className={`eye-slash-line transition-all duration-300 ease-in-out ${showPassword ? 'stroke-dashoffset-[30] opacity-0' : 'stroke-dashoffset-0 opacity-100'}`} style={{ strokeDasharray: 30 }}></line>
                </svg>
              </button>
            </div>
            {errors.password && <span className="text-[10px] text-red-500 mt-1 block animate-pulse">{errors.password}</span>}
          </div>

          {/* Confirm Password Group */}
          <div className="mb-6">
            <label className="block text-[0.8rem] mb-1.5 text-gray-700 dark:text-[#d1d5db] font-medium transition-colors duration-500">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => {
                  setForm({ ...form, confirmPassword: e.target.value });
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                }}
                placeholder="Repeat password"
                className={`w-full pl-3 pr-10 py-2.5 rounded-lg text-[0.9rem] outline-none transition-all duration-300
                  bg-gray-50 dark:bg-[#1e2136] 
                  text-gray-900 dark:text-white 
                  border focus:ring-2 focus:ring-[#625df5]/20
                  ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-[#2a2e45] focus:border-[#625df5]'}
                `}
              />
              {/* Eye Button Toggle (Smooth) */}
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full flex items-center justify-center text-gray-400 dark:text-[#8b94a7] hover:text-[#625df5] dark:hover:text-[#8b85ff] transition-colors">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
                  <line x1="2" y1="2" x2="22" y2="22" className={`eye-slash-line transition-all duration-300 ease-in-out ${showConfirmPassword ? 'stroke-dashoffset-[30] opacity-0' : 'stroke-dashoffset-0 opacity-100'}`} style={{ strokeDasharray: 30 }}></line>
                </svg>
              </button>
            </div>
            {errors.confirmPassword && <span className="text-[10px] text-red-500 mt-1 block animate-pulse">{errors.confirmPassword}</span>}
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
              ) : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}