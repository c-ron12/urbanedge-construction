// 1. Base URL for files/images
export const fileUrl = 'http://localhost:8000';

// 2. Use this for Public Frontend requests (matches public Laravel routes)
export const apiUrl = 'http://localhost:8000/api';

// 3. Use this for Admin/Protected requests (matches Laravel prefix)
export const adminApiUrl = 'http://localhost:8000/api/admin';

// 4. Token retrieval logic
export const token = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const data = JSON.parse(userInfo);
    return data.token;
  }
  return null;
};
