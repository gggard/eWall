'use strict';

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import {FormControl, FormGroup, ControlLabel, Button, Alert} from 'react-bootstrap';
import { browserHistory } from 'react-router'
import Icon from 'react-fa'

import UserActions from '../../../../actions/UserActions'

import UserStore from '../../../../stores/UserStore'

import { withRouter } from 'react-router'
import TimerMixin from 'react-timer-mixin';

require('styles/ewall/main/components/Login.sass');

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = UserStore.getState();

    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)


    //UserStore.listen(this.onChange);
  }

  componentDidMount() {
    UserStore.listen(this.onChange);
    }

  componentWillUnmount() {
    UserStore.unlisten(this.onChange);
  }

  onChange(state) {
    console.log('logincomponent onChange',state);

    if (state.loggedIn & state.error == null) {
      console.log('[LoginComponent] login ok redirecting to /');
      //browserHistory.push('/');
      //this.props.router.replace('/')

      TimerMixin.setTimeout(
      () => { this.props.router.replace('/'); },
        0
      );
    }
    else
       this.setState(state);
  }

  login(e) {
    e.preventDefault();
    console.log('login',this.state);
    UserActions.login(this.state.email, this.state.password);
  }

  handleLoginChange(event) {
    this.setState({email : event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password : event.target.value});
  }

  render() {
    if (this.state.loading) {
      var button = <Button type="submit" bsStyle="primary"  bsSize="large" block disabled><Icon name="refresh" spin={true}/></Button>
    } else {
      var button = <Button type="submit" bsStyle="primary"  bsSize="large" block>Login</Button>
    }
    if (this.state.errorMessage) {
      var alert = <Alert bsStyle="danger"><b>Error !</b> {this.state.errorMessage}</Alert>
    } else {
      var alert = ''
    }
    return (
      <div className="login-component">
      <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Please login to continue</Modal.Title>
      </Modal.Header>

      <Modal.Body>

      {alert}
      <form onSubmit={this.login}>
       <FormGroup controlId="formControlsText">
       <ControlLabel>Email address</ControlLabel>
         <FormControl type="text" placeholder="email" onChange={this.handleLoginChange}/>
         <ControlLabel>Password</ControlLabel>
         <FormControl type="password" placeholder="password" onChange={this.handlePasswordChange}/>
       </FormGroup>
       {button}
       </form>

      </Modal.Body>


    </Modal.Dialog>


      </div>
    );
  }
}

export default withRouter(LoginComponent)
