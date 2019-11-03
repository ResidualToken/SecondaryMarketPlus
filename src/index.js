import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import App from './App.jsx';

import Firebase, { FirebaseContext } from './components/Firebase';

let backendHost;
//we are not using this
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;
const protocol = window && window.location && window.location.protocol;

if (protocol === "https:" && (hostname === 'residual.com' || hostname === 'neo.residual.com')) {
  backendHost = 'https://dev-api.residual.com'
}
else {
  backendHost = 'http://127.0.0.1:8000'
}

export const API_ROOT = `${backendHost}`;

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
, document.getElementById('root'));
