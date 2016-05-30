import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import LoginComponent from './components/ewall/main/components/LoginComponent';

import RoomsComponent from './components/ewall/main/components/RoomsComponent';
import RoomComponent from './components/ewall/main/components/RoomComponent';
import LogoutComponent from './components/ewall/main/components/LogoutComponent';

import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import UserStore from './stores/UserStore'

if (typeof window !== 'undefined') {
    window.React = React;
}

function requireAuth(nextState, replace) {
  console.log('requireAuth', nextState);
  console.log(localStorage.getItem('jwt'));
  if (localStorage.getItem('jwt')===null) {
    console.log('redirect to login');
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  } else {
    console.log('User is logged')
  }
}

// Render the main component into the dom
//ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/rooms" />
      <Route path="login" component={LoginComponent}/>
      <Route path="logout" component={LogoutComponent} />
      <Route path="rooms" component={RoomsComponent} onEnter={requireAuth}/>
      <Route path="rooms/:roomId" component={RoomComponent} />

    </Route>
  </Router>
), document.getElementById('app'))
