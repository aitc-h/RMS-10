import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../state/cartContext';

const activeStyle = {
  color: 'purple',
};

const activeStyleFunc = ({ isActive }) => (isActive ? activeStyle : {});

export default function Header() {
  const { numItemsInCart } = useCart();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink style={activeStyleFunc} to="/shoes">
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink style={activeStyleFunc} to="/backpacks">
              Backpacks
            </NavLink>
          </li>
          <li>
            <NavLink style={activeStyleFunc} to="/cart">
              Cart{numItemsInCart > 0 ? ` (${numItemsInCart})` : null}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
