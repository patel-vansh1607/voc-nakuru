import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Import this
import './index.css';
import App from './App'; 
import Maintenance from './components/Maintenance/Maintenance'; 
import reportWebVitals from './reportWebVitals';

// SET THIS TO 'false' TO TURN OFF MAINTENANCE MODE
const isMaintenance = false; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* 2. Wrap the logic in BrowserRouter */}
    <BrowserRouter>
      {isMaintenance ? <Maintenance /> : <App />}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();