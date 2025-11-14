import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

// Get the root element from the HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped with ThemeProvider
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
