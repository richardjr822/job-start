'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthRequest } from '@/hooks/useAuthRequest';
import { USER_ROLES } from '@/constants';

const FieldError = ({ error }) => {
  if (!error) return null;
  return <p className="mt-1 text-xs text-red-600">{error[0]}</p>;
};

export default function AuthPage() {
  const {
    register,
    login,
    isLoading,
    error: authHookError,
    setError: setAuthHookError,
  } = useAuthRequest();

  const [isLoginMode, setIsLoginMode] = useState(false);
  const router = useRouter();

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    phone: '',
    role: USER_ROLES.JOB_SEEKER,
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [generalError, setGeneralError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegisterChange = (e) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleModeChange = (newModeIsLogin) => {
    setIsLoginMode(newModeIsLogin);
    setAuthHookError(null);
    setGeneralError(null);
    setFormErrors({});
    setSuccessMessage('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError(null);
    setFormErrors({});
    setSuccessMessage('');
    try {
      const data = await register(registerForm);
      setSuccessMessage('Registration successful! Please log in to continue.');
      handleModeChange(true);
      setLoginForm({ email: registerForm.email, password: '' });
    } catch (err) {
      if (err.status === 400 && err.data?.errors) {
        setFormErrors(err.data.errors);
      } else {
        setGeneralError(err.message || 'An unknown registration error occurred');
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError(null);
    setFormErrors({});
    setSuccessMessage('');
    try {
      const { user } = await login(loginForm);
      router.push('/jobs-test');
    } catch (err) {
      if (err.status === 400 && err.data?.errors) {
        setFormErrors(err.data.errors);
      } else {
        setGeneralError(err.message || 'An unknown login error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-blue-100">
              {isLoginMode ? 'Sign in to continue' : 'Join our platform today'}
            </p>
          </div>
          <div className="p-8">
            <div className="flex gap-2 mb-6 bg-blue-50 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => handleModeChange(false)}
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
                onClick={() => handleModeChange(true)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  isLoginMode
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-blue-600 hover:bg-blue-100'
                }`}
              >
                Login
              </button>
            </div>
            {generalError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                <p className="text-sm text-red-700">{generalError}</p>
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            )}
            {!isLoginMode && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black"
                  />
                  <FieldError error={formErrors.email} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Min 6 characters"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black"
                  />
                  <FieldError error={formErrors.password} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 234 567 8900"
                    value={registerForm.phone}
                    onChange={handleRegisterChange}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black"
                  />
                  <FieldError error={formErrors.phone} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    I am a
                  </label>
                  <select
                    name="role"
                    value={registerForm.role}
                    onChange={handleRegisterChange}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-black"
                  >
                    <option value={USER_ROLES.JOB_SEEKER}>Job Seeker</option>
                    <option value={USER_ROLES.JOB_POSTER}>Job Poster</option>
                  </select>
                  <FieldError error={formErrors.role} />
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
            {isLoginMode && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black"
                  />
                  <FieldError error={formErrors.email} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black"
                  />
                  <FieldError error={formErrors.password} />
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
          </div>
        </div>
        <p className="text-center text-sm text-blue-700 mt-6">
          {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => handleModeChange(!isLoginMode)}
            className="font-semibold hover:underline"
          >
            {isLoginMode ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
}