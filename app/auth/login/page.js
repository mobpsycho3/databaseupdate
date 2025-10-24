'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser, saveSession, isAuthenticated } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated()) {
      router.push('/aarti-pooja');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = loginUser(formData.email, formData.password);

    if (result.success) {
      saveSession(result.user);
      router.push('/aarti-pooja');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F1EB] via-[#FFF5E6] to-[#F5F1EB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Decorative Om Symbol */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#C97A3C] to-[#D4AF37] text-white text-3xl font-bold shadow-lg">
            ॐ
          </div>
          <h2 className="mt-6 text-4xl font-bold text-[#3D2817]">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-[#5A3825]">
            Sign in to book Aarti & Pooja services
          </p>
        </div>

        {/* Demo Credentials Card */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-[#C97A3C]/20 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-[#C97A3C] mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-[#5A3825]">
            <p><strong>Email:</strong> user@temple.com</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#C97A3C]/10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#3D2817] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border-2 border-[#C97A3C]/20 placeholder-gray-400 text-[#3D2817] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C97A3C] focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#3D2817] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border-2 border-[#C97A3C]/20 placeholder-gray-400 text-[#3D2817] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C97A3C] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-[#C97A3C] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#C97A3C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C97A3C] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#5A3825]">
              Don't have an account?{' '}
              <Link 
                href="/auth/signup" 
                className="font-semibold text-[#C97A3C] hover:text-[#D4AF37] transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-[#5A3825] hover:text-[#C97A3C] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
