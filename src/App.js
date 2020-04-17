import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import axios from 'axios';
import AuthRoute from './util/AuthRoute';

import Navbar from './components/Navbar';

import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED} from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

import jwtDecode from 'jwt-decode';

axios.defaults.baseURL = 'https://asia-east2-vasdevour.cloudfunctions.net/api';

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f44336',
    }
  },
  typography: {
    useNextVariants: true
  }
})

const token = localStorage.vaSToken;
if(token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute exact path='/login' component={login}/>
              <AuthRoute exact path='/signup' component={signup}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
      </MuiThemeProvider>
  );
}

export default App;
