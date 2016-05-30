'use strict';

import React from 'react';

class AuthenticatedComponent extends React.Component {
  static willTransitionTo(transition) {
       console.log('willTransitionTo', transition);
        if (!auth.loggedIn()) {
          transition.redirect('/login', {}, {'nextPath' : transition.path});
        }
      }

      render () {
        return <Component {...this.props}/>
      }
}

export default AuthenticatedComponent;
