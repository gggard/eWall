require('normalize.css/normalize.css');
require('styles/bootstrap/css/bootstrap.css');
require('styles/App.scss');

import React from 'react';
import WorkspaceComponent from 'components/ewall/main/components/WorkspaceComponent';

//let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        {this.props.children}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
