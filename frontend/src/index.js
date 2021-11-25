import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// I imported bootstrap from the bootstrap library
import 'bootstrap/dist/css/bootstrap.min.css';
// I imported bootstrap JS plugin from the bootstrap library
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
