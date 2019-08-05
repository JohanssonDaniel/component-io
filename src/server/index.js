const express = require('express');
const logger = require('morgan');

// webpack
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');

// socket.io
const socketio = require('socket.io');

// local imports
const webpackCfg = require('../../webpack.dev');
const { SOCKET_MSG } = require('../shared/Constants');
const { Component } = require('./component');
const { Game } = require('./game');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackCfg);
  app.use(webpackDevMiddleWare(compiler));
} else {
  app.use(express.static('dist'));
}

const port = process.env.PORT || 3000;

const server = app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

const game = new Game();

const io = socketio(server);

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);
  socket.on(SOCKET_MSG.USERNAME_SUBMITTED, (username) => {
    console.log(`Username was submitted: ${username}`);
    game.addPlayer(socket, username);
  })
  socket.on(SOCKET_MSG.INPUT, (input) => {
    const x = input.x;
    const y = input.y;
    console.log(`recieved input: x = ${x}, y = ${y}`);
    game.handleInput(x, y);
  })
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
  })
});
