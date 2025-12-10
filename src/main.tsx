import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/main.scss';

const container = document.getElementById('app');

if (!container) {
  throw new Error('Root container with id "app" not found');
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
