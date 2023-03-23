import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Navbar from './reusable-components/navbar/navbar';
import CopyrightFooter from './reusable-components/copyright-footer/copyright-footer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <App />
    <CopyrightFooter />
  </React.StrictMode>
);


