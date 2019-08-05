const io = require('socket.io-client');

const { SOCKET_MSG } = require('../shared/Constants');
const { getAsset, downloadAssets } = require('./assets');

import SVG from 'svg.js';
import 'svg.draggable.js'


const socket = io(`ws://${window.location.host}`);

socket.on(SOCKET_MSG.UPDATE, (update) => {
    console.log('Update recieved');
    update.newComponents.forEach((component) => {
        const asset = getAsset(component.img);
        const draw = SVG('drawing');
        const figure = draw
                        .svg(asset)
                        .draggable();
    });
});

const form = document.getElementById('form-username');
const input = document.getElementById('input-username');

window.onload = () => {

    downloadAssets();

    input.focus();
    
    form.onsubmit = (e) => {
        e.preventDefault();
        socket.emit(SOCKET_MSG.USERNAME_SUBMITTED, input.value);
        input.value = '';
        form.hidden = true;
        return false;
    }
}



