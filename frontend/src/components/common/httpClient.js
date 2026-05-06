import { token } from './http';

export const request = async (url, options = {}) => {
  // url is the API endpoint, options is an object that can contain method, headers, body etc. default {} empty object (prevents errors if nothing passed)
  try {
    const isFormData = options.body instanceof FormData; // Check if body is FormData (file upload) vs JSON (normal data/Object or String); if FormData, then don't set Content-Type because browser sets multipart/form-data automatically.
    const userToken = token(); // get token from local storage (if user is logged in)

    const res = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }), //
        ...(userToken && { Authorization: `Bearer ${userToken}` }),
        ...(options.headers || {}), // allow override in other files if needed.
      },
    });

    // Handle HTTP errors (IMPORTANT — fetch does NOT throw for 404/500)
    if (!res.ok) {
      throw new Error('SERVER_ERROR');
    }

    // Converts JSON (string) response body into JavaScript object.
    // Throws on invalid JSON Object (handled in catch, but not as 'INVALID_RESPONSE' unless rethrown)

    const result = await res.json();

    // Safety check for backend structure
    if (!result || typeof result.status === 'undefined') {
      throw new Error('INVALID_RESPONSE');
    } 

    return result; // if everything is fine, return the parsed JSON result.
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('NETWORK_ERROR');
    }

    throw error; // if not a network error, rethrow the original error (could be SERVER_ERROR, INVALID_RESPONSE, or something else).
  }
};
