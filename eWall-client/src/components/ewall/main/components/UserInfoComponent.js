'use strict';

import React from 'react';


import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import UserStore from '../../../../stores/UserStore'

import UserActions from '../../../../actions/UserActions'

import { browserHistory } from 'react-router'
//require('styles/ewall/main/components/Toolbar.sass');

class UserInfoComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = UserStore.getState();

  }

  componentDidMount() {
    UserStore.listen(this.onChange);
    }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }

  onChange(state) {
    console.log('userInfo onChange',state);
    this.setState(state);
  }

  handleLogout() {
    console.log('handleLogout');
    UserActions.logout();
    browserHistory.push('/login');
  }


  render() {
    console.log(this.state);
    return (
      <NavDropdown eventKey={3} title={this.state.user.name} id="basic-nav-dropdown" pullRight>
        <MenuItem eventKey={3.1}>User settings</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3} onClick={this.handleLogout} >Log out</MenuItem>
      </NavDropdown>
    );
  }
}

export default UserInfoComponent;
