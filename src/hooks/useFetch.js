import { useState, useEffect, useRef } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        let response = await fetch(baseUrl + url);
        if (!response.ok) throw response;
        if (isMounted.current) setData(await response.json());
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    init();

    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return {
    data,
    error,
    loading,
    isMounted,
  };
}

export function Fetch({ url, children }) {
  const { data, loading, error } = useFetch(url);
  return children(data, loading, error);
}
