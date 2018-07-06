let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let cors = require('cors');
let errorhandler = require('errorhandler');
let mongoose = require('mongoose');

let isProduction = process.env.NODE_ENV === 'production';

// create app object
let app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

// Normal express config defaults
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());

app.use(
  session({
    secret: 'conduit',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }),
);

// initialize error handler in production
if (!isProduction) {
  app.use(errorhandler());
}

// mongo settings
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/conduit');
  mongoose.set('debug', true);
}
// models
require('./models/User');

// middleware
require('./middleware/passport');

app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// server client
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// finally, let's start our server...
let server = app.listen(process.env.PORT || 3001, function() {
  console.log('Listening on port ' + server.address().port);
});

server.setTimeout(2147483647);
