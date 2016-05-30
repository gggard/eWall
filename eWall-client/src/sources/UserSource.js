import 'whatwg-fetch';

var UserActions = require('../actions/UserActions');

var UserSource = {
  fetch: function() {
    return new Promise(function (resolve, reject) {
      fetch('http://localhost:9090/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization' : localStorage.getItem('jwt')
          }
      })
      .then (function (response) {
        console.log(response)
        if(response.ok) {
          response.json().then(function(jsonResponse) {
            resolve(jsonResponse);
          })
        } else {
          console.log('reject : ', response)
          reject(response);
        }
      })
      .catch(function(error) {
         console.log('Error fetch user : ' + error.message);
         reject(error);
      });
    });
  },

  login: function (email, password) {
    // returning a Promise because that is what fetch does.
    return new Promise(function (resolve, reject) {

      fetch('http://localhost:9090/api/authenticate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'email='+encodeURIComponent(email)+'&password='+encodeURIComponent(password)
      })
      .then(function(response) {
         if(response.ok) {
           response.json().then(function(jsonResponse) {
             console.log('get user ',jsonResponse)
             if (jsonResponse.success == true) {

               jsonResponse.user.token = jsonResponse.token;
               console.log('resolving user ', jsonResponse.user)
               resolve(jsonResponse.user);
             } else {
               reject(jsonResponse.message);
             }
           });
         } else {
           console.log('Error login : ',response);
           reject(response);
         }  } )
      .catch(function(error) {
         console.log('Error login : ' + error.message);
         reject(error.message);
      });

      // simulate an asynchronous action where data is fetched on
      // a remote server somewhere.
      //setTimeout(function () {
        // resolve with some mock data
      //  resolve({user : 'gege'});
      //}, 250);
    });
  }
};

export default UserSource;
