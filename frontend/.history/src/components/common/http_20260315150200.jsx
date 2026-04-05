export const apiUrl = 'http://localhost:8000/api';
export const fileUrl = 'http://localhost:8000';    // for accessing images and files.

export const token = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const data = JSON.parse(userInfo);     // userInfo is coming from login.jsx where we have stored user info in local storage after login.
  if (userInfo) {
    return data.token;
  }
  return null;
};

// --- Professional: Default headers for API calls ---
export const publicHeaders = () => {
  return {
    Accept: 'application/json', // Always expect JSON from backend
  };
};

// --- Professional: Headers for protected routes ---
export const authHeaders = () => {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${token()}`,
  };
};