import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import Spinner from './common/Spinner';

import PageNotFound from './common/PageNotFound';

export default function Products() {
  const [size, setSize] = useState('');
  const { category } = useParams();
  const {
    error,
    loading,
    data: products,
  } = useFetch('products?category=' + category);

  if (error) throw error;

  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((product) =>
        product.skus.find((s) => s.size === parseInt(size))
      )
    : products;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{' '}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
