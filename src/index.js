import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Maintenance from './components/Maintenance/Maintenance'; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// We are only rendering Maintenance. 
// No need to even import App.js until you're ready to go live.
root.render(
  <React.StrictMode>
    <Maintenance />
  </React.StrictMode>
);

reportWebVitals();