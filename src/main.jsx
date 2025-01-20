import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Correct path to App.jsx
import './styles/App.css'; // Ensure this path matches your file structure

console.log("Symptom Checker is working!");
// Your additional JavaScript logic goes here.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
