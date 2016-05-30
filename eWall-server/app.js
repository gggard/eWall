var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var rooms = require('./routes/rooms');

var User = require('./models/user');
var userToJson = require('./api/user');

var mongoose = require('mongoose');

var config = require('./config/main');

var passport = require('passport');
var passport_config = require('./config/passport')
passport_config(passport);
var jwt = require('jsonwebtoken');

var cors = require('cors')


var app = express();
var server = app.listen(9090);

var io = require('socket.io')(server);

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

app.use(cors({'allowedHeaders' : ['authorization','content-type', 'location', 'X-Custom-Header' ]}));
app.options('*', cors({'allowedHeaders' : ['X-Custom-Header' ]}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({ secret: 'jcfrlevcejmncjnjdbxedhx' }));
app.use(passport.initialize());
app.use(passport.session());

//app.use('/', routes);

mongoose.connect(config.database);

// Create API group routes
var apiRoutes = express.Router();
// Register new users
apiRoutes.post('/register', function(req, res) {
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
apiRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.secret, {
            expiresIn: 10080 // in seconds
          });
          userToJson(user, function(userJson) {
            res.json({ success: true, token: 'JWT ' + token, user: userJson });
          });

        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});
// Set url for API group routes
app.use('/api', apiRoutes);
app.use('/api/users', users);
app.use('/api/rooms', rooms);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

io.use(function(socket, next){
    console.log("Query: ", socket.handshake.query);

    if (!socket.handshake.query.jwt) {
      next(new Error('Authentication error : no JWT token'));
      return;
    }

    try {
      var decoded = jwt.verify(socket.handshake.query.jwt.replace('JWT ',''), config.secret);
    } catch(err) {
      return next(new Error(err));
    }

    console.log(decoded)

    socket.user = decoded._doc;
    return next();

    // return the result of next() to accept the connection.
    //f (socket.handshake.query.foo == "bar") {
    //    return next();
    //}
    // call next() with an Error if you need to reject the connection.
    //next(new Error('Authentication error'));
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('noteDrag', function (data) {
    io.sockets.in(data.roomId).emit('noteDrag',
                { roomId: data.roomId,
                  noteId: data.noteId,
                  position: {x : data.position.x,
                             y : data.position.y} });
    console.log(data);
  });

  socket.on('subscribe', function(data) {
    socket.join(data.room);
    io.sockets.in(data.room).emit('userEntering', {
      'roomId': data.room,
      'user': socket.user.name
    })
  });

  socket.on('unsubscribe', function(data) {
    io.sockets.in(data.room).emit('userExiting', {
      'roomId': data.room,
      'user': socket.user.name
    })
    socket.leave(data.room);
  });

});



module.exports = app;
