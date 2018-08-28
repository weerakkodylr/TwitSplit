import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from '../shared/App'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

import styles from '../shared/styles/less/main.less'

import Thunk from 'redux-thunk'

import reducer from '../shared/reducers'

const middleware = applyMiddleware(Thunk)

const preloadedState = window.__initialData__
delete window.__initialData__

const store = createStore(reducer,preloadedState, middleware);

const root = document.getElementById("root");

ReactDOM.hydrate(<Provider store={store}>
					<BrowserRouter>
						<App/>
					</BrowserRouter>
				</Provider>
				, root);
