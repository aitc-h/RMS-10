import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import Spinner from './common/Spinner';
import PageNotFound from './common/PageNotFound';

export default function Detail({ addToCart }) {
  const { id } = useParams();
  const skuRef = useRef();
  const { error, loading, data: product } = useFetch(`products/${id}`);
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

      <select id="size" ref={skuRef}>
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
            const sku = skuRef.current.value;
            if (!sku) return alert('Select a size');

            addToCart(id, sku);
            navigate('/cart');
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
