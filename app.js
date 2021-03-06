var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

//Register New db Schema
var db = require('./model/db'),
    blob = require('./model/blobs'),
    user = require('./model/users');
    customer = require('./model/customers');
    item = require('./model/items');
    stock = require('./model/stocks');
    rate = require('./model/rates');
    
//Register new routes.
var routes = require('./routes/index'),
    blobs = require('./routes/blobs'),
    users = require('./routes/users');
    customers = require('./routes/customers');
    items = require('./routes/items');
    stocks = require('./routes/stocks');
    rates = require('./routes/rates');
    
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Register new routes to app.
app.use('/', routes);
app.use('/blobs', blobs);
app.use('/users', users);
app.use('/customers', customers);
app.use('/items', items);
app.use('/stocks', stocks);
app.use('/rates', rates);

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


module.exports = app;
