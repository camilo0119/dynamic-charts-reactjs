import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import presetDataEnvironment from './utils/presetData';
window.React = React;

presetDataEnvironment();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('charts-coleva')
);
