$(document).ready(() => {
    const socket = io();
    $('#btnClick').click(() => {
        const msg = $('#txtMessage').val();
        //socket.emit('CLIENT-SEND-MSG', Math.random());
        socket.emit('CLIENT-SEND-MSG', msg);
    });
    socket.on('SERVER-SEND-MSG', data => {
        //console.log(data);
         $('ulMessage').append(`<li><p>${data}</p></li>`);
    });
});

