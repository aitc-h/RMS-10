import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useFetchAll from './fetch/useFetchAll';
import { useCart } from './state/cartContext';
import Spinner from './components/Spinner';

export default function Cart() {
  const { cart, dispatch } = useCart();

  const urls = useMemo(() => cart.map((i) => `products/${i.id}`), [cart]);
  const { data: products, loading, error } = useFetchAll(urls);
  const navigate = useNavigate();

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus, category } = products.find(
      (p) => p.id === parseInt(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <Link key={sku} to={`/${category}/${id}`}>
        <li className="cart-item">
          <img src={`/images/${image}`} alt={name} />
          <div>
            <h3>{name}</h3>
            <p>${price}</p>
            <p>Size: {size}</p>
            <p>
              <select
                aria-label={`Select quantity for ${name} size ${size}`}
                onChange={(e) =>
                  dispatch({
                    type: 'updateQuantity',
                    sku,
                    quantity: parseInt(e.target.value),
                  })
                }
                value={quantity}
              >
                <option value="0">Remove</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </p>
          </div>
        </li>
      </Link>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  const numItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section id="cart">
      <h1>Cart</h1>
      <h2>
        {numItemsInCart === 0
          ? 'Cart is empty'
          : `${numItemsInCart} item${numItemsInCart > 1 ? 's' : ''} in cart`}
      </h2>

      <ul>{cart.map(renderItem)}</ul>

      {numItemsInCart > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </button>
      )}
    </section>
  );
}
