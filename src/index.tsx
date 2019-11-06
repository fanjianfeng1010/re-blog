import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker'
import configureStore from './configureStore'
import Main from './Main'
import { History } from 'history'

import './index.scss';

const initialState = window.INITIAL_REDUX_STATE

// tslint:disable-next-line
const history: History = createBrowserHistory()
const store = configureStore(history, initialState)

ReactDOM.render(<Main store={store} history={history} />, document.getElementById('root'))
serviceWorker.unregister()
