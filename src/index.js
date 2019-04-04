import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {Provider} from 'react-redux';

import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'

import reducers from './reducer'
import AuthRoute from './component/authroute/authroute';

import './config'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd-mobile/dist/antd-mobile.css';

import Login from './container/login/login';
import Register from './container/register/register';
import Dashboard from './container/dashboard/dashboard';

const store = createStore(reducers,compose(
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	))

ReactDOM.render((
	<Provider store={store}>
		<BrowserRouter>
			<AuthRoute></AuthRoute> 
				<Switch>
					<Route path='/login' component={Login}></Route>
					<Route path='/dashboard' component={Dashboard}></Route>
					<Route path='/register' component={Register}></Route>
				</Switch>
		</BrowserRouter>
	</Provider>
	), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
