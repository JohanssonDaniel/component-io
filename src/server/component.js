const shortid = require('shortid');

class Component {
    constructor(owner) {
        this.id = shortid();
        this.owner = owner;
        this.img = 'and.svg';
        this.x = 0;
        this.y = 0;
        this.a = false;
        this.b = false;
    }

    output() {
        return true;
    }

    serialize() {
        return {
            id: this.id,
            owner: this.owner,
            img: this.img,
            x: this.x,
            y: this.y,
            output: this.output(),
        }
    }
}

module.exports = {
    Component,
}

// class AndGate extends Component{
//     constructor(owner) {
//         super(owner);
//     }

//     output() {
//         return (this.a && this.b);
//     }
// }