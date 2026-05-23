export const getErrorMessage = (error, fallback = 'Something went wrong.') => {
  // 1. Handle specific Validation errors coming from backend (422 Unprocessable Entity)
  if (error.message === 'VALIDATION_ERROR' && error.details) {
    try {
      const firstKey = Object.keys(error.details)[0];
      return error.details[firstKey][0];
    } catch (e) {
      return fallback; // Safety net if the object structure is weird
    }
  }

  // 2. Handle Network issues
  if (error.message === 'NETWORK_ERROR') {
    return 'Network error. Please check your internet connection.';
  }

  // 3. Handle Server crashes
  if (error.message === 'SERVER_ERROR') {
    return 'Server error. Please try again later.';
  }

  // 4. Handle your existing Invalid Response check
  if (error.message === 'INVALID_RESPONSE') {
    return 'Unexpected data received. Please contact support.';
  }

  // 5. Final Fallback
  return fallback;
};
