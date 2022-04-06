import useSWR from 'swr';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetcher = async (url) => {
  const response = await fetch(BASE_URL + url);
  if (response.ok) return response.json();
  throw response;
};

export const useProduct = (id) => {
  const { data, error } = useSWR(`products/${id}`, fetcher);

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCategory = (category) => {
  const { data, error } = useSWR(`products?category=${category}`, fetcher);

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
};
