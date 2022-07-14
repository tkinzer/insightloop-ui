import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '~/components/root/App';

/**
 * TODO: Wrap App in FirebaseContext/AppContext
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
