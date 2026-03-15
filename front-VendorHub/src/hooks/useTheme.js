// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

export function useTheme() {
  // 1. الديفولت بتاعنا هيكون قراية من الـ LocalStorage، لو مفيش يبقى System
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // المتغير ده بيعرفنا حالة جهاز اليوزر حالياً (دارك ولا لايت)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // دالة لتطبيق الثيم على الـ HTML
    const applyTheme = () => {
      let activeTheme = theme;
      
      // لو اليوزر مختار System، هنشوف جهازه نظامه إيه ونطبقه
      if (theme === 'system') {
        activeTheme = mediaQuery.matches ? 'dark' : 'light';
      }
      
      if (activeTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    // تطبيق الثيم وحفظ اختيار اليوزر في اللوكال ستوريدج
    applyTheme();
    localStorage.setItem('theme', theme);

    // Event Listener: عشان لو اليوزر مختار System وجهازه غير الثيم بالليل، الموقع يتغير معاه لايف!
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  return { theme, setTheme };
}