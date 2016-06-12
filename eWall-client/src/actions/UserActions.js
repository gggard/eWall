'use strict';

var alt = require('../alt');

import UserSource from '../sources/UserSource'

class UserActions {
  updateLoginUser(user) {
    return user;
  }

  updateUser(user) {
    return user;
  }

  fetch() {
    return (dispatch) => {
      dispatch();
      UserSource.fetch()
        .then((user) => {this.updateUser(user);})
        .catch((errorMessage) => {
          console.log('catch...', errorMessage);
          this.userFailed(errorMessage);
        });
    }
  }

  login(email,password) {
  return (dispatch) => {
    // we dispatch an event here so we can have "loading" state.
    dispatch();
    UserSource.login(email, password)
      .then((user) => {
        // we can access other actions within our action through `this.actions`
        this.updateLoginUser(user);
      })
      .catch((errorMessage) => {
        this.userFailed(errorMessage);
      });
    }
}

logout(user) {
  return (dispatch) => {
    // we dispatch an event here so we can have "loading" state.
    dispatch();
   }
}

userFailed(errorMessage) {
  return errorMessage;
}
  }


module.exports = alt.createActions(UserActions);
