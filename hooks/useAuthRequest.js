import { useState } from 'react';
import * as authService from '../services/authService';

export const useAuthRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (serviceFunction, ...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await serviceFunction(...args);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  return {
    isLoading,
    error,
    setError,
    register: (userData) => handleRequest(authService.registerUser, userData),
    login: (credentials) => handleRequest(authService.loginUser, credentials),
    logout: () => handleRequest(authService.logoutUser),
  };
};