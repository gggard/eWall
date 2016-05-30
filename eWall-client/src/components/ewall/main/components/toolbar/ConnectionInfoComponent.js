'use strict';

import React from 'react';


import Navbar from 'react-bootstrap/lib/Navbar';


import Icon from 'react-fa'

//require('styles/ewall/main/components/Toolbar.sass');



import io from 'socket.io-client'
let socket = io(`http://localhost:9090`)

class ConnectionInfoComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { connected : false }

    this.onChange = this.onChange.bind(this);
    this.onSocketConnect = this.onSocketConnect.bind(this);
    this.onSocketDisconnect = this.onSocketDisconnect.bind(this);
  }

  componentDidMount() {
    socket.on('connect', this.onSocketConnect);
    socket.on('disconnect', this.onSocketDisconnect);
   }

  componentWillUnmount() {
  }

  onSocketConnect() {
    this.setState({connected : true});
  }

  onSocketDisconnect() {
    this.setState({connected : false});
  }

  onChange(state) {
    console.log('connectionInfo onChange',state);
    this.setState(state);
  }



  render() {
    console.log(this.state);
    return (
      <Navbar.Text pullRight>
      { (this.state.connected) ? <Icon name="exchange" /> :   <Icon name="warning" /> }
      </Navbar.Text>
    );
  }
}

export default ConnectionInfoComponent;
