import { useState, useEffect, useRef } from 'react';

export default function useFetchAll(urls) {
  const uniques = urls.filter((e, i, l) => l.indexOf(e) === i);

  const prevUrls = useRef([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (areEqual(prevUrls.current, uniques)) {
      setLoading(false);
      return;
    }
    prevUrls.current = uniques;
    const promises = uniques.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [uniques]);

  return { data, loading, error };
}

function areEqual(array1, array2) {
  return (
    array1.length === array2.length && array1.every((e, i) => e === array2[i])
  );
}
