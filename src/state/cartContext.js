import React, { useReducer, useEffect, useMemo, useContext } from 'react';
import cartReducer from './cartReducer';

export const CartContext = React.createContext(null);

let initialCart = (() => {
  try {
    return JSON.parse(localStorage.getItem('cart')) ?? [];
  } catch {
    console.error('The cart could not be parsed into JSON.');
    return [];
  }
})();

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const contextValue = {
    cart,
    dispatch,
    numItemsInCart: useMemo(
      () => cart.reduce((total, item) => total + item.quantity, 0),
      [cart]
    ),
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      'CartContext must be used within a CartProvider. Wrap a parent component in <CartProvider /> to fix this error.'
    );
  return context;
}
