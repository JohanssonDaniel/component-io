const shortid = require('shortid');

class Player {
    constructor(socket, name) {
        this.id = shortid();
        this.socket = socket;
        this.name = name;
        this.components = [];
    }
}