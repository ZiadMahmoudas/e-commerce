// src/pages/RegisterPage.jsx
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Customer",
    storeName: "",
    storeDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "Min 8 chars required";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (form.role === "Vendor" && !form.storeName.trim()) {
      newErrors.storeName = "Store Name is required for vendors";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = useMemo(() => {
    const baseValid =
      form.fullName.trim().length > 0 &&
      form.email.length > 0 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.password.length >= 8 &&
      form.password === form.confirmPassword;

    if (form.role === "Vendor") {
      return baseValid && form.storeName.trim().length > 0;
    }
    return baseValid;
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data } = await authApi.register(form);
      if (data.success) {
        if (form.role === "Vendor") {
          toast.success("Registration submitted! Wait for admin approval.");
          navigate("/login");
        } else {
          setAuth(data.data.user, data.data.token);
          toast.success("Account created successfully!");
          navigate("/");
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // الخلفية داكنة ثابتة bg-transparent لأن الخلفية في index.css
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center 
      relative px-4 py-8"
    >
      {/* الـ Card الأساسي الداكن */}
      <div
        className="relative z-10 w-full max-w-[440px] 
        bg-[#141728] 
        px-8 py-8 rounded-2xl 
        shadow-[0_10px_30px_rgba(0,0,0,0.5)]
        border border-white/5 
        overflow-hidden"
      >
        {/* الخط المتدرج الاحترافي الكامل في الأعلى */}
        <div
          className="absolute top-0 left-0 w-full h-[2px] 
          bg-gradient-to-r from-[#1797e8] via-[#8a2387] via-[#e85a17] to-[#1797e8]
          rounded-t-2xl animate-[gradientBackground_10s_linear_infinite]"
          style={{ backgroundSize: "300% 100%" }}
        ></div>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-500/30">
            <span className="text-white font-bold text-2xl">V</span>
          </div>
          <h1 className="text-2xl font-bold mb-1 text-white">Create Account</h1>
          <p className="text-[0.85rem] text-[#8b94a7]">
            Join VendorHub and start the adventure
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selector (داكن ثابت) */}
          <div className="bg-[#1e2136] p-1 rounded-xl flex items-center border border-[#2a2e45] transition-colors duration-300">
            {["Customer", "Vendor"].map((r) => {
              const isActive = form.role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setForm({ ...form, role: r });
                    if (r === "Customer") {
                      const newErr = { ...errors };
                      delete newErr.storeName;
                      setErrors(newErr);
                    }
                  }}
                  className={`flex-1 py-2.5 text-[0.85rem] font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2
                    ${
                      isActive
                        ? "bg-[#2a2e45] text-[#8b85ff] shadow-sm border border-transparent"
                        : "text-[#8b94a7] hover:text-white border border-transparent"
                    }
                  `}
                >
                  {r === "Customer" ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  )}
                  {r}
                </button>
              );
            })}
          </div>

          {/* Full Name Group */}
          <div>
            <label className="block text-[0.8rem] mb-1.5 text-[#d1d5db] font-medium transition-colors duration-500">
              Full Name
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => {
                setForm({ ...form, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: null });
              }}
              placeholder="John Doe"
              className={`w-full px-4 py-3 rounded-xl text-[0.95rem] outline-none transition-all duration-300
                bg-[#1e2136] 
                text-white placeholder-gray-500
                border focus:ring-2 focus:ring-[#625df5]/20
                ${errors.fullName ? "border-red-500" : "border-[#2a2e45] focus:border-[#625df5]"}
              `}
            />
            {errors.fullName && (
              <span className="text-[10px] text-red-500 mt-1 block animate-pulse">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email Group */}
          <div>
            <label className="block text-[0.8rem] mb-1.5 text-[#d1d5db] font-medium transition-colors duration-500">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-xl text-[0.95rem] outline-none transition-all duration-300
                bg-[#1e2136] 
                text-white placeholder-gray-500
                border focus:ring-2 focus:ring-[#625df5]/20
                ${errors.email ? "border-red-500" : "border-[#2a2e45] focus:border-[#625df5]"}
              `}
            />
            {errors.email && (
              <span className="text-[10px] text-red-500 mt-1 block animate-pulse">
                {errors.email}
              </span>
            )}
          </div>

          {/* Passwords Container (Side by side on larger screens, stacked on small) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password Group */}
            <div>
              <label className="block text-[0.8rem] mb-1.5 text-[#d1d5db] font-medium transition-colors duration-500">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    if (errors.password)
                      setErrors({ ...errors, password: null });
                    // نعيد التقييم لو كان كاتب الـ confirm الغلط
                    if (
                      form.confirmPassword &&
                      e.target.value !== form.confirmPassword
                    ) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: "Passwords do not match",
                      }));
                    } else if (
                      form.confirmPassword &&
                      e.target.value === form.confirmPassword
                    ) {
                      setErrors((prev) => ({ ...prev, confirmPassword: null }));
                    }
                  }}
                  placeholder="Min 8 chars"
                  className={`w-full pl-4 pr-11 py-3 rounded-xl text-[0.95rem] outline-none transition-all duration-300
                    bg-[#1e2136] 
                    text-white placeholder-gray-500
                    border focus:ring-2 focus:ring-[#625df5]/20
                    ${errors.password ? "border-red-500" : "border-[#2a2e45] focus:border-[#625df5]"}
                  `}
                />

                {/* Eye Button Toggle (Smooth) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full flex items-center justify-center 
                    text-[#8b94a7] hover:text-white transition-colors"
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[18px] h-[18px]"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                    <line
                      x1="2"
                      y1="2"
                      x2="22"
                      y2="22"
                      className={`eye-slash-line transition-all duration-300 ease-in-out ${showPassword ? "stroke-dashoffset-[30] opacity-0" : "stroke-dashoffset-0 opacity-100"}`}
                      style={{ strokeDasharray: 30 }}
                    ></line>
                  </svg>
                </button>
              </div>
              {errors.password && (
                <span className="text-[10px] text-red-500 mt-1 block animate-pulse">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password Group */}
            <div>
              <label className="block text-[0.8rem] mb-1.5 text-[#d1d5db] font-medium transition-colors duration-500">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => {
                    setForm({ ...form, confirmPassword: e.target.value });
                    if (errors.confirmPassword)
                      setErrors({ ...errors, confirmPassword: null });
                  }}
                  placeholder="Repeat password"
                  className={`w-full pl-4 pr-11 py-3 rounded-xl text-[0.95rem] outline-none transition-all duration-300
                    bg-[#1e2136] 
                    text-white placeholder-gray-500
                    border focus:ring-2 focus:ring-[#625df5]/20
                    ${errors.confirmPassword ? "border-red-500" : "border-[#2a2e45] focus:border-[#625df5]"}
                  `}
                />

                {/* Eye Button Toggle (Smooth) */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full flex items-center justify-center 
                    text-[#8b94a7] hover:text-white transition-colors"
                  title={
                    showConfirmPassword ? "Hide Password" : "Show Password"
                  }
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[18px] h-[18px]"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                    <line
                      x1="2"
                      y1="2"
                      x2="22"
                      y2="22"
                      className={`eye-slash-line transition-all duration-300 ease-in-out ${showConfirmPassword ? "stroke-dashoffset-[30] opacity-0" : "stroke-dashoffset-0 opacity-100"}`}
                      style={{ strokeDasharray: 30 }}
                    ></line>
                  </svg>
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-[10px] text-red-500 mt-1 block animate-pulse">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>

          {/* Vendor Specific Fields - بـ أنيميشن خفيف لما تظهر */}
          {form.role === "Vendor" && (
            <div className="pt-2 pb-1 space-y-4 animate-[fadeSlideUp_0.3s_ease-out]">
              <div className="h-px w-full bg-[#2a2e45] mb-2"></div>

              <div>
                <label className="block text-[0.8rem] mb-1.5 text-[#d1d5db] font-medium transition-colors">
                  Store Name *
                </label>
                <input
                  type="text"
                  value={form.storeName}
                  onChange={(e) => {
                    setForm({ ...form, storeName: e.target.value });
                    if (errors.storeName)
                      setErrors({ ...errors, storeName: null });
                  }}
                  placeholder="My Awesome Store"
                  className={`w-full px-3 py-3 rounded-xl text-[0.95rem] outline-none transition-all duration-300
                    bg-[#1e2136] 
                    text-white placeholder-gray-500
                    border focus:ring-2 focus:ring-[#625df5]/20
                    ${errors.storeName ? "border-red-500" : "border-[#2a2e45] focus:border-[#625df5]"}
                  `}
                />
                {errors.storeName && (
                  <span className="text-[10px] text-red-500 mt-1 block animate-pulse">
                    {errors.storeName}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-[0.8rem] mb-1.5 text-[#d1d5db] font-medium transition-colors">
                  Store Description
                </label>
                <textarea
                  rows={2}
                  value={form.storeDescription}
                  onChange={(e) =>
                    setForm({ ...form, storeDescription: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl text-[0.95rem] outline-none transition-all duration-300
                    bg-[#1e2136] 
                    text-white placeholder-gray-500
                    border border-[#2a2e45] focus:border-[#625df5] focus:ring-2 focus:ring-[#625df5]/20"
                  placeholder="Tell customers about your store..."
                />
              </div>

              <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 text-[0.75rem] text-yellow-500 flex gap-2 items-start transition-colors duration-300">
                <svg
                  className="w-4 h-4 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Vendor accounts require admin approval before becoming active.
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`w-full py-3.5 mt-2 rounded-xl text-[0.95rem] font-medium transition-all duration-300 flex justify-center items-center
              ${
                isFormValid
                  ? "bg-[#625df5] hover:bg-[#736ef7] text-white shadow-[0_4px_15px_rgba(98,93,245,0.3)] cursor-pointer"
                  : "bg-[#2a2e45] text-gray-400 cursor-not-allowed opacity-70"
              }
            `}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="text-center mt-5 text-[0.8rem] text-[#8b94a7]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#8b85ff] hover:text-[#a5a1ff] font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
