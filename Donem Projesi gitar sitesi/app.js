var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var homeRouter = require('./routes/home.router');
var userRouter = require('./routes/user.router');
var productRouter = require('./routes/product.router');
var AdresRouter = require('./routes/adres.router');
var CategoryRouter = require('./routes/category.router');
var OrderRouter = require('./routes/order.router');
var AdminRouter = require('./routes/admin.router');

var app = express();

const dbURL=''
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('Database bağlama işleminiz başarıyla gerçekleşti')).catch((err) => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',homeRouter);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/adres',AdresRouter);
app.use('/category',CategoryRouter);
app.use('/order',OrderRouter);
app.use('/admin',AdminRouter);

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
