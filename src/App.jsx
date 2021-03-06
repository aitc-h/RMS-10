// Library
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Stylesheets
import './App.css';

// Common components
import Header from './components/Header';
import Footer from './components/Footer';

// Routes
import Products from './Products';
import Detail from './Detail';
import Cart from './Cart';
import Checkout from './Checkout';

export default function App() {
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
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
