// Library
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Stylesheets
import './App.css';

// Common components
import Header from './common/Header';
import Footer from './common/Footer';

// Routes
import Products from './Products';
import Detail from './Detail.class';
import Cart from './Cart';
import Checkout from './Checkout.class';

import { useCart } from './context/cart';
// import useCheckout from './hooks/useCheckout';

export default function App() {
  const { dispatch } = useCart();
  // const checkout = useCheckout(dispatch);

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={<Checkout dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
