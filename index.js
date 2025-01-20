// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // You can put global styles here
import App from './App'; // Import the App component

// Render the App component into the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Make sure your HTML has a div with id 'root'
);
