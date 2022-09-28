var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
http = require('http');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var messages = [
  {
    id: 1,
    text: "Hola soy un mensaje",
    author: "Carlos Azaustre",
  },
];


// iniciar servidor
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var jugadores = {}

// configurando el websocket
io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");
  socket.emit("messages", messages);

  socket.on("new-message", function (data) {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});
server.listen(3300);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
