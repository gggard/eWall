'use strict';

import React from 'react';


import Modal from 'react-bootstrap/lib/Modal';
import {Button} from 'react-bootstrap';


import { browserHistory } from 'react-router'

require('styles/ewall/main/components/widgets/NetworkErrorComponent.sass');

class NetworkErrorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    console.log('redirecting to /login');
    browserHistory.push('/login');
  }

  render() {
    console.log('render NetworkErrorComponent', this.props.error);

    var errorDescription ='';


    if (this.props.error instanceof TypeError) {
      errorDescription = <span>{this.props.error.message}</span>
    } else {
      if (this.props.error)
        errorDescription = <span>Server answered : <i>{this.props.error.status} {this.props.error.statusText}</i></span>
    }

    return (
      <div className="static-modal">
    <Modal show={true} dialogClassName='network-error-modal-content'>
      <Modal.Header>
        <Modal.Title>Ooops network error !</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Something goes wrong while communicating with the eWall server.<br/>
        {errorDescription}
      </Modal.Body>

      <Modal.Footer>
        <Button bsStyle="danger" onClick={this.handleOnClick}>Reconnect</Button>
      </Modal.Footer>

    </Modal>
  </div>
    );
  }
}

export default NetworkErrorComponent;
