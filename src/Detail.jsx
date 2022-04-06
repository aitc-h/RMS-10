import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import Spinner from './common/Spinner';
import PageNotFound from './common/PageNotFound';
import { useCart } from './context/cart';

export default function Detail() {
  const { id, category } = useParams();
  const { dispatch } = useCart();
  const { error, loading, data: product } = useFetch(`products/${id}`);
  const [sku, setSku] = useState('');
  const navigate = useNavigate();

  if (category !== 'shoes') return <PageNotFound />;

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select
        title="Size"
        id="size"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      >
        <option value="">Select size</option>
        {product.skus.map(({ sku, size }) => (
          <option key={sku} value={sku}>
            {size}
          </option>
        ))}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch({ type: 'add', id, sku });
            navigate('/cart');
          }}
          disabled={!sku}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
