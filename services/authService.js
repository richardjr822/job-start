const API_BASE_URL = '/api/auth';

/**
 * Registers a new user.
 * @param {object} userData - User data
 * @param {string} userData.email
 * @param {string} userData.phone
 * @param {string} userData.password
 * @param {string} userData.role - 'seeker' or 'poster'
 * @returns {Promise<any>} The response data from the API
 */
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
};

/**
 * Logs in a user.
 * @param {object} credentials - User credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<any>} The response data from the API
 */
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};


export const logoutUser = async () => {

  console.log('Logout function called (implement /api/auth/logout)');
};