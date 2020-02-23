const $ = require('jquery');
const io = require('socket.io-client');
const xuLyDangKy = require('./xulydangky.js');
const xyLyNhanTin = require('./xulynhantin.js');

$('document').ready(() => {
    const socket = io();
    $('#divChat').hide();

    xuLyDangKy(socket);
    xyLyNhanTin(socket);
});
