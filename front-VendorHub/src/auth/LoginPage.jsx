// src/pages/LoginPage.jsx
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';

    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Min 6 chars';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = useMemo(() => {
    return (
      form.email.length > 0 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.password.length >= 6
    );
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data } = await authApi.login(form);
      if (data.success) {
        setAuth(data.data.user, data.data.token);
        toast.success('Welcome back!');
        const role = data.data.user.role;
        if (role === 'Admin') navigate('/admin');
        else if (role === 'Vendor') navigate('/vendor');
        else navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // زراير تجربة التوستر (ممكن تمسحها بعدين)
  const testSuccessToast = () => toast.success('Login Successful! Welcome back.');
  const testErrorToast = () => toast.error('Invalid Email or Password.');

  return (
    // خلينا الطول h-screen والـ overflow-hidden عشان نمنع السكرول الخارجي تماماً
    <div className="h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center 
      bg-[#f8f9fa] dark:bg-[#0b0f19] transition-colors duration-500 relative px-4"
    >
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.03] transition-opacity duration-500" 
           style={{
             backgroundImage: `
                linear-gradient(currentColor 1px, transparent 1px),
                linear-gradient(90deg, currentColor 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px',
             color: 'currentcolor'
           }}
      ></div>

      {/* قللنا الـ py-8 لـ py-6 عشان نلم الطول */}
      <div className="relative z-10 w-full max-w-[400px] 
        bg-white dark:bg-[#141728] 
        px-8 py-6 rounded-2xl 
        shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]
        border border-gray-200 dark:border-white/5 
        transition-colors duration-500"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] 
          bg-gradient-to-r from-transparent via-[#00d2ff] to-[#8a2387] 
          rounded-t-2xl">
        </div>

        {/* زراير تجربة التوستر - امسح الديف ده بعد ما تجرب */}
        <div className="absolute -top-12 left-0 w-full flex justify-center gap-2">
           <button type="button" onClick={testSuccessToast} className="text-xs bg-green-500 text-white px-2 py-1 rounded">Test Success</button>
           <button type="button" onClick={testErrorToast} className="text-xs bg-red-500 text-white px-2 py-1 rounded">Test Error</button>
        </div>

        {/* Header - المسافات متقللة */}
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-500">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 21.5L2 10.5L7 3H17L22 10.5L12 21.5Z" fill="#8b85ff"/>
              <path d="M12 21.5L2 10.5L12 14L22 10.5L12 21.5Z" fill="#625df5"/>
            </svg>
            RePriceMax
          </div>
          <h1 className="text-xl font-bold mb-1 text-gray-900 dark:text-white transition-colors duration-500">
            Welcome !
          </h1>
          <p className="text-[0.8rem] text-gray-500 dark:text-[#8b94a7] leading-relaxed transition-colors duration-500">
            Please sign-in to start the adventure
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Group */}
          <div className="mb-3">
            <label className="block text-[0.8rem] mb-1 text-gray-700 dark:text-[#d1d5db] font-medium transition-colors duration-500">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 rounded-lg text-[0.9rem] outline-none transition-all duration-300
                bg-gray-50 dark:bg-[#1e2136] 
                text-gray-900 dark:text-white 
                border focus:ring-2 focus:ring-[#625df5]/20
                ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-[#2a2e45] focus:border-[#625df5]'}
              `}
            />
            {errors.email && <span className="text-[10px] text-red-500 mt-1 block animate-pulse">{errors.email}</span>}
          </div>

          {/* Password Group */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[0.8rem] text-gray-700 dark:text-[#d1d5db] font-medium transition-colors duration-500">
                Password
              </label>
              <Link to={'/forgot-password'} className="text-[0.75rem] text-[#625df5] hover:text-[#736ef7] dark:text-[#8b85ff] dark:hover:text-[#a5a1ff] transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                placeholder="••••••••"
                className={`w-full pl-3 pr-10 py-2 rounded-lg text-[0.9rem] outline-none transition-all duration-300
                  bg-gray-50 dark:bg-[#1e2136] 
                  text-gray-900 dark:text-white 
                  border focus:ring-2 focus:ring-[#625df5]/20
                  ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-[#2a2e45] focus:border-[#625df5]'}
                `}
              />
              
              {/* Eye Button Toggle - Smooth Path Animation */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full flex items-center justify-center 
                  text-gray-400 dark:text-[#8b94a7] hover:text-[#625df5] dark:hover:text-[#8b85ff] transition-colors"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                  {/* السر هنا: strokeDasharray بيعمل الخط مقطع، و Dashoffset بيسحبه بره وجوه بنعومة */}
                  <line 
                    x1="2" y1="2" x2="22" y2="22" 
                    className="transition-all duration-300 ease-in-out" 
                    style={{ 
                      strokeDasharray: 30, 
                      strokeDashoffset: showPassword ? 30 : 0, 
                      opacity: showPassword ? 0 : 1
                    }}
                  ></line>
                </svg>
              </button>
            </div>
            {errors.password && <span className="text-[10px] text-red-500 mt-1 block animate-pulse">{errors.password}</span>}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex items-center justify-center">
               <input
                type="checkbox"
                id="remember"
                className="peer appearance-none w-[14px] h-[14px] border rounded cursor-pointer transition-colors duration-300
                  bg-gray-50 dark:bg-[#1e2136]
                  border-gray-300 dark:border-[#2a2e45]
                  checked:bg-[#625df5] checked:border-[#625df5]"
              />
               <svg className="absolute w-2 h-2 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
           
            <label htmlFor="remember" className="text-[0.75rem] text-gray-600 dark:text-[#d1d5db] cursor-pointer select-none transition-colors duration-500">
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`w-full py-2 rounded-lg text-[0.9rem] font-medium transition-all duration-300 flex justify-center items-center
              ${isFormValid 
                ? 'bg-[#625df5] hover:bg-[#736ef7] text-white shadow-[0_4px_15px_rgba(98,93,245,0.3)] cursor-pointer' 
                : 'bg-gray-300 dark:bg-[#2a2e45] text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-70'}
            `}
          >
            {loading ? (
                <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign in'}
          </button>
          
          <p className="text-center mt-3 text-[0.75rem] text-gray-500 dark:text-[#8b94a7] transition-colors duration-500">
            New on our platform? <Link to="/register" className="text-[#625df5] hover:text-[#736ef7] dark:text-[#8b85ff] dark:hover:text-[#a5a1ff] font-medium transition-colors">Create an account</Link>
          </p>

          <div className="flex items-center text-center my-3 text-[0.7rem] text-gray-400 dark:text-[#8b94a7] transition-colors duration-500 before:content-[''] before:flex-1 before:border-b before:border-gray-200 dark:before:border-[#2a2e45] before:mr-3 after:content-[''] after:flex-1 after:border-b after:border-gray-200 dark:after:border-[#2a2e45] after:ml-3">
            OR
          </div>

          <button type="button" className="w-full mb-2 py-2 flex items-center justify-center gap-2 bg-transparent border border-gray-200 dark:border-[#2a2e45] rounded-lg text-[0.85rem] font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-300">
            <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <button type="button" className="w-full py-2 flex items-center justify-center gap-2 bg-transparent border border-gray-200 dark:border-[#2a2e45] rounded-lg text-[0.85rem] font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-300">
            <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V7.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
            </svg>
            Sign in with Facebook
          </button>
        </form>
      </div>
    </div>
  );
}