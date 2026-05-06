import React from 'react';

const useFetch = (url, isArray = true) => {
  const [data, setData] = React.useState(isArray ? [] : null);
  const [loading, setLoading] = React.useState(true); // true means data is being fetched, so show loading skeleton while fetching data. false means data has been fetched and we can show the data or empty state.
  const [error, setError] = React.useState(null); // To store error message if api call fails, used in empty state below.

  const fetchData = async () => {
    setLoading(true); // show skeleton loader
    setError(null); // clear previous errors (if any) before new fetch attempt, (important when retrying API). Without this, old error messages could still show

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('SERVER_ERROR');
      }

      // Converts JSON (string) response body into JavaScript object.
      // Throws if response is not valid JSON  Object (caught in catch, but not as 'INVALID_RESPONSE' unless rethrown)
      const result = await res.json();

      if (!result || (isArray && !Array.isArray(result.data))) {
        throw new Error('INVALID_RESPONSE');
      }

      setData(result.data);
    } catch (error) {
      console.error('Fetch error:', error);

      if (error.message === 'Failed to fetch') {
        setError('Network error. Please check your internet connection.');
      } else if (error.message === 'SERVER_ERROR') {
        setError('Server error. Please try again later.');
      } else if (error.message === 'INVALID_RESPONSE') {
        setError('Unexpected data received.');
      } else {
        setError('Something went wrong.');
      }

      setData(isArray ? [] : null); // set data to empty array or null if api call fails
    } finally {
      setLoading(false); // hide skeleton loader
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [url]); // Fetch data when url changes

  return { data, loading, error,  refetch: fetchData }; // expose state and rename fetchData to refetch for future external use like in (Retry Button), (Refresh Button) etc.
};

export default useFetch;
