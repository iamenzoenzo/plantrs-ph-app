import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import { UrlContext } from './Context';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Components
import Navbar from './components/layout/Navbar';
import themeObject from './util/theme';
import AuthRoute from './util/AuthRoute';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

import axios from 'axios';

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL =
	'https://us-central1-plantrs-ph.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		// Redirects to login if the token is expired
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

function App() {
	const [detail, setDetail] = useState({ urlImg: null, fileImg: null });

	// render() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<UrlContext.Provider value={{ detail, setDetail }}>
					<Router>
						<Navbar />
						<div className='container'>
							<Switch>
								<Route exact path='/' component={home} />
								<AuthRoute exact path='/login' component={login} />
								<AuthRoute exact path='/signup' component={signup} />
								<Route exact path='/users/:handle' component={user} />
								<Route
									exact
									path='/users/:handle/plant/:plantId'
									component={user}
								/>
							</Switch>
						</div>
					</Router>
				</UrlContext.Provider>
			</Provider>
		</MuiThemeProvider>
	);
	// }
}

export default App;
