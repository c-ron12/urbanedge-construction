// components/common/httpClient.js
import { token, adminApiUrl } from './http'; 

export const request = async (url, options = {}) => {
  try {
    const cleanUrl = url.replace(/^\//, '');
    const fullUrl = `${adminApiUrl}/${cleanUrl}`; 

    const isFormData = options.body instanceof FormData;
    const userToken = token();

    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(userToken && { Authorization: `Bearer ${userToken}` }),
        ...(options.headers || {}),
      },
    });

    if (res.status === 422) {
      const errorData = await res.json();
      const validationError = new Error('VALIDATION_ERROR');
      validationError.details = errorData.errors;
      throw validationError;
    }

    if (!res.ok) {
      throw new Error('SERVER_ERROR');
    }

    const result = await res.json();

    if (!result || typeof result.status === 'undefined') {
      throw new Error('INVALID_RESPONSE');
    }

    return result;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('NETWORK_ERROR');
    }
    throw error;
  }
};
