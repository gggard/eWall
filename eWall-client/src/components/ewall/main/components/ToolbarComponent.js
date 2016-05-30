'use strict';

import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';


import Icon from 'react-fa'


import UserStore from '../../../../stores/UserStore'
import UserInfo from './UserInfoComponent'
import ConnectionInfo from './toolbar/ConnectionInfoComponent'

require('styles/ewall/main/components/Toolbar.sass');

class ToolbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddNote = this.handleAddNote.bind(this)
  }

  handleAddNote(e) {
     e.preventDefault();
     console.debug('handleAddNote');
     this.props.onAddNote();

  }

  render() {
    return (
      <div className="toolbar-component">

        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">{this.props.title}</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={this.handleAddNote} ><Icon name="sticky-note-o" /></NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>

            <UserInfo/>
          </Nav>
          <ConnectionInfo/>

          </Navbar.Collapse>
        </Navbar>

      </div>
    );
  }
}

ToolbarComponent.displayName = 'EwallMainComponentsToolbarComponent';

// Uncomment properties you need
// ToolbarComponent.propTypes = {};
// ToolbarComponent.defaultProps = {};

export default ToolbarComponent;
