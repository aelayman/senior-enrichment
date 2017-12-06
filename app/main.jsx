'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store';
import UserInterface from './components/UserInterface';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <UserInterface />
    </Router>
  </Provider>,
  document.getElementById('main')
);

