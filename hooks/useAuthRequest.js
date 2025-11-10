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
      const errorMessage = err.message || 'An unknown error occurred';
      setIsLoading(false);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    isLoading,
    error,
    setError,
    /**
     * Registers a new user.
     * @param {object} userData - email, phone, password, role
     */
    register: (userData) =>
      handleRequest(authService.registerUser, userData),

    /**
     * Logs in a user.
     * @param {object} credentials - email, password
     */
    login: (credentials) =>
      handleRequest(authService.loginUser, credentials),

    /**
     * Logs out a user.
     */
    logout: () => handleRequest(authService.logoutUser),
  };
};