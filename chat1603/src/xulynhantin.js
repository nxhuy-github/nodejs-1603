const $ = require('jquery');

const xuLyNhanTin = (socket) => {
    $('#btnClick').click(() => {
        const msg = $('#txtMessage').val();
        socket.emit('CLIENT_SEND_MSG', msg);
    });
    socket.on('MSG_FOR_ALL', msg => {
        $('#ulMessage').append(`<li>${msg}</li>`);
    });

};

module.exports = xuLyNhanTin;