var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {sequelize} =require('./models/index');
const session = require('express-session');
const middleware = require('./middleware');
var methodOverride = require("method-override");

const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const usuarioRouter = require('./routes/usuarioRouter');
const logoutRoute = require('./routes/logoutRouter');
const todoRouter = require('./routes/todoRouter');
const listaRouter = require('./routes/listaRouter');



const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( session({
  secret: "superTodoApp",
  resave: true,
  saveUninitialized: true,
}));
app.use(methodOverride("_method"));


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use("/logout", logoutRoute);
app.use('/register', registerRouter);
app.use('/usuarios', middleware.requireLogin, usuarioRouter);
app.use('/tareas', middleware.requireLogin, todoRouter);
app.use('/listas', middleware.requireLogin, listaRouter);



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
