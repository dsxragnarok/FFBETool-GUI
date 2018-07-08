import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';

import './normalize.css';
import './index.css';
import { AppWithRouter } from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({ ...reducers, router: routerReducer }),
  applyMiddleware(middleware)
);

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <AppWithRouter />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
