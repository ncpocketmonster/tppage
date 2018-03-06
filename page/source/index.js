import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Front from './front.js';

import store from './store.js';

ReactDOM.render(
  <Provider store={store}>
    <Front />
  </Provider>,
  document.getElementById('root')
);