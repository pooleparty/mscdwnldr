import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { init } from './actions';
import App from './App';
import './index.css';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  ));

init(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
