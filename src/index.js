import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './_base.scss'
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// ReactDOM.render(<App />, document.getElementById("root"))