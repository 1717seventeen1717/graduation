var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');
var moment = require('moment');
//连接数据库
mongoose.connect('mongodb://localhost/graduationProject');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var providerRouter = require('./routes/providers');
var imageRouter = require('./routes/images');
var goodsRouter = require('./routes/goods');
var purchaseRouter = require('./routes/purchases');
var deliveryRouter = require('./routes/deliverys');
var rejectedRouter = require('./routes/rejecteds');
var stocksRouter = require('./routes/stocks');
var sendsRouter = require('./routes/sends');
var checksRouter = require('./routes/checks');


var app = express();

// view engine setup(视图引擎设置)
app.set('views', path.join(__dirname, 'views')); //设置视图引擎的目录是views
app.set('view engine', 'ejs'); //视图引擎类型

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); //使用cors

//对应了index页面 /users对应了user模块
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/providers', providerRouter);
app.use('/images', imageRouter);
app.use('/goods', goodsRouter);
app.use('/checks', checksRouter);
app.use('/purchases', purchaseRouter);
app.use('/deliverys', deliveryRouter);
app.use('/rejecteds', rejectedRouter);
app.use('/stocks', stocksRouter);
app.use('/sends', sendsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;