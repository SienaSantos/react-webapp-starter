var express = require('express');
var compression = require('compression');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
// var helmet = require('helmet');
var cors = require('cors')
var logger = require('morgan');
var MongoStore = require('connect-mongo')(session);

// var json2csv = require('express-json2csv');
// var busboy = require('connect-busboy');
// var busboyBodyParser = require('busboy-body-parser');

var dburi =
    process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/rfc360-admin';
//
mongoose.connect(dburi, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + dburi + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + dburi);
    }
});

var sess = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge : 43200000} //from 8hrs ,change to 12hrs
}


//routes declaration
var routes = require('./routes/index');


var app = express();
app.set('trust proxy', 1) // trust first proxy

app.use(cors())

app.use(compression());
app.use(logger('dev'));
// app.use(pino)
// app.use(busboy());
// app.use(busboyBodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(json2csv)
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

//routes
app.use('/', routes);

// if (app.get('env') === 'production') {
//
//   app.use(helmet())
//
//
//   function wwwRedirect(req, res, next) {
//     if (req.headers.host.slice(0, 4) === 'www.') {
//         var newHost = req.headers.host.slice(4);
//         return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
//     }
//     next();
//   };
//
//   app.enable('trust proxy');
//
//   app.use(wwwRedirect);
//
//   // Add a handler to inspect the req.secure flag (see
//   // http://expressjs.com/api#req.secure). This allows us
//   // to know whether the request was via http or https.
//   app.use (function (req, res, next) {
//           if (req.secure) {
//                   // request was via https, so do no special handling
//                   next();
//           } else {
//                   // request was via http, so redirect to https
//                   res.redirect('https://' + req.headers.host + req.url);
//           }
//   });
//
// }


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img', 'cs-icon.png')));


// webpack middleware
// only do this in dev, in prod -- serve actual bundled files

// webpack imports
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var webpack = require('webpack');
  var config = require('./webpack.config.js');
  var compiler = webpack(config)

 app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler)); // And this line


//
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }





// flash messages
// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });


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
  app.use(function (err, req, res, next) {
    res.status(500);
    res.render('404', {
      title: 'Not found!',
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(500)
  res.render('404', {
    title: 'Not found!',
    message: err.message,
    error: {}
  });
});


module.exports = app;
