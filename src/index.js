import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Main Element
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// Context
import { CartProvider } from './state/cartContext';

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root')
);
