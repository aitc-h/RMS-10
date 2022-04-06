import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Spinner from './components/Spinner';
import PageNotFound from './components/PageNotFound';

import { useCart } from './state/cartContext';

import { toTitleCase } from './lib/string';
import { useProduct } from './lib/fetch';

export default function Detail() {
  const { id, category } = useParams();
  const { dispatch } = useCart();
  const [sku, setSku] = useState('');
  const navigate = useNavigate();

  const { product, isLoading, isError } = useProduct(id);

  // if (error) throw error;
  if (isLoading) return <Spinner />;
  if (isError) return <PageNotFound />;

  console.log(product);
  const { name, description, price, skus, image } = product;

  return (
    <div id="detail">
      <h4>{toTitleCase(category)} &gt; </h4>
      <h1>{name}</h1>
      <p>{description}</p>
      <p id="price">${price}</p>
      <select
        title="Size"
        id="size"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      >
        <option value="">Select size</option>
        {skus?.map(({ sku, size }) => (
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
      <img src={`/images/${image}`} alt={category} />
    </div>
  );
}
