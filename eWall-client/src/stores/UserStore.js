var alt = require('../alt');
var UserActions = require('../actions/UserActions');

class UserStore {
  constructor() {
    this.noUser = {accessibleRooms: []};
    this.user = this.noUser;
    this.loading = false;
    this.loggedIn = false;

    this.bindListeners({
      handleUpdateLoginUser: UserActions.UPDATE_LOGIN_USER,
      handleUpdateUser: UserActions.UPDATE_USER,
      handleFetch : UserActions.FETCH,
      handleLogin: UserActions.LOGIN,
      handleLogout: UserActions.LOGOUT,
      handleUserFailed: UserActions.USER_FAILED
    });
  }

  handleUpdateLoginUser(user) {
    console.log('handleUpdateLoginUser',user);
    this.user = user;
    this.loading = false;
    this.errorMessage = null;
    this.error = null;
    this.loggedIn = true;
    localStorage.setItem('jwt', user.token);
  }

  handleUpdateUser(user) {
    console.log('handleUpdateUser',user);
    this.user = user;
    this.loggedIn = true;
    this.errorMessage = null;
    this.error = null;
  }

  handleFetch() {
  }

  handleLogin() {
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.user = {};
    this.loading = true;
    this.loggedIn = false;
  }

  handleLogout() {
    console.log('User log out');
    this.user = this.noUser;
    this.loggedIn = false;
    localStorage.removeItem('jwt');
  }

  handleUserFailed(error) {
    console.log('handleUserFailed', error)
    this.errorMessage = error.statusText;
    this.error = error;
    this.user = this.noUser;
    this.loading = false;
    this.loggedIn = false;
    //localStorage.removeItem('jwt');
  }
}


module.exports = alt.createStore(UserStore, 'UserStore');
