const io = require('socket.io-client');

const { SOCKET_MSG } = require('../shared/Constants');

const socket = io(`ws://${window.location.host}`);
const form = document.getElementById('form-username');
const input = document.getElementById('input-username');

window.onload = () => {
    input.focus();
    
    form.onsubmit = (e) => {
        e.preventDefault();
        socket.emit(SOCKET_MSG.USERNAME_SUBMITTED, input.value);
        input.value = '';
        form.hidden = true;
        return false;
    }
}
// const connectedPromise = new Promise((resolve) => {
//   socket.on('connect', () => {
//     console.log('Connected to server!');
//     resolve();
//   });
// });



