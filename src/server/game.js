const { SOCKET_MSG } = require('../shared/Constants');
const { Component } = require('./component');

class Game {
    constructor() {
        this.updates = [];
        this.sockets = {};
        this.players = {};
        this.shouldUpdate = false;
        setInterval(this.update.bind(this), 1000 / 60);
    }

    addPlayer(socket, userName) {
        this.sockets[socket.id] = socket;
        this.players[socket.id] = userName;

        this.shouldUpdate = true;
    }

    handleInput(x, y) {
        this.shouldUpdate = true;
    }

    update() {
        if (this.shouldUpdate) {
            Object.keys(this.sockets).forEach((id) => {
                const socket = this.sockets[id];
                socket.emit(
                  SOCKET_MSG.UPDATE,
                  {
                    t: Date.now(),
                    newComponents: [new Component('danne')],
                  },
                );
              });
            this.shouldUpdate = false;
        }
    }

    print() {
        console.log(this.canvas);
    }
}

module.exports = {
    Game,
}