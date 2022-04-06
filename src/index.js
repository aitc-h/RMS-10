import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './common/ErrorBoundary';
import { CartProvider } from './context/cart';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  // <ErrorBoundary>
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>,
  /* </ErrorBoundary>, */ document.getElementById('root')
);
