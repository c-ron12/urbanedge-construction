export const getErrorMessage = (error, fallback = 'Something went wrong.') => {
  if (error.message === 'NETWORK_ERROR') {
    return 'Network error. Please check your internet connection.';
  }

  if (error.message === 'SERVER_ERROR') {
    return 'Server error. Please try again later.';
  }

  if (error.message === 'INVALID_RESPONSE') {
    return 'Unexpected data received. Please contact support.';
  }

  // Use custom fallback (depends on component)
  return fallback;
};
