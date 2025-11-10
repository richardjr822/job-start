'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthRequest } from '@/hooks/useAuthRequest';
import { USER_ROLES } from '@/constants';

export default function AuthPage() {
  const { register, login, isLoading, error } = useAuthRequest();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const router = useRouter();

  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState(USER_ROLES.JOB_SEEKER);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await register({
        email: regEmail,
        password: regPassword,
        phone: regPhone,
        role: regRole,
      });
      alert('Registration Successful!');
      console.log('Registration successful:', data);
    } catch (err) {
      alert(`Registration Failed: ${err.message}`);
      console.error('Registration failed:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({
        email: loginEmail,
        password: loginPassword,
      });
      alert('Login Successful!');
      console.log('Login successful:', data);
      router.push('/jobs-test');
    } catch (err) {
      alert(`Login Failed: ${err.message}`);
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-blue-100">
              {isLoginMode ? 'Sign in to continue' : 'Join our platform today'}
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-6 bg-blue-50 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setIsLoginMode(false)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  !isLoginMode
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-blue-600 hover:bg-blue-100'
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setIsLoginMode(true)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  isLoginMode
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-blue-600 hover:bg-blue-100'
                }`}
              >
                Login
              </button>
            </div>

            {/* Registration Form */}
            {!isLoginMode && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Min 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    I am a
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-black"
                  >
                    <option value={USER_ROLES.JOB_SEEKER}>Job Seeker</option>
                    <option value={USER_ROLES.JOB_POSTER}>Job Poster</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Registering...' : 'Create Account'}
                </button>
              </form>
            )}

            {/* Login Form */}
            {isLoginMode && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Logging in...' : 'Sign In'}
                </button>

                <p className="text-center text-sm text-blue-600 mt-4">
                  Note: You must be logged in to post jobs
                </p>
              </form>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800">Error</p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-blue-700 mt-6">
          {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="font-semibold hover:underline"
          >
            {isLoginMode ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
}