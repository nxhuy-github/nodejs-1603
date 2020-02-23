const getData = require('./getData');
const $ = require('jquery');
const io = require('socket.io-client');

$(document).ready(() => {
    const socket = io();
    $('#btnClick').click(() => {
        const msg = $('#txtMessage').val();
        //socket.emit('CLIENT-SEND-MSG', Math.random());
        socket.emit('CLIENT-SEND-MSG', msg);
    });
    socket.on('SERVER-SEND-MSG', function (data) {
        console.log(data);
         $('#ulMessage').append(`<li><p>${data}</p></li>`);
    });
});

console.log('123');
console.log(getData());