const $ = require('jquery');
const io = require('socket.io-client');
const startCamera = require('./startCamera');
const Peer = require('simple-peer');
const playMyStream = require('./playMyStream');
const playFriendStream = require('./playFriendStream');
const getInitSignal = require('./getInitSignal');
const getAnswerSignal = require('./getAnswerSignal');

$('document').ready(() => {
    const socket = io();
    $('#divChat').hide();

    $('#btnSignUp').click(() => {
        const username = $('#txtUsername').val();
        socket.emit('DANG_KY_USERNAME', username);
    });


    socket.on('XAC_NHAN_DANG_KY', arrUser => {
        if (arrUser) {
            arrUser.forEach(e => {
                $('#ulUser').append(`<li id="${e}">${e}</li>`);
            });
            socket.on('NGUOI_DUNG_MOI', username => {
                $('#ulUser').append(`<li id="${username}">${username}</li>`);
            });
            $('#divChat').show();
            return $('#divSignUp').hide();
        }
        alert('Username da ton tai!'); // eslint-disable-line
    });

    socket.on('NGUOI_DUNG_THOAT', username => {
        $(`#${username}`).remove();
    });

    $('#ulUser').on('click', 'li', function () {
        const dest = $(this).text();
        // make call
        startCamera()
            .then(stream => {
                playMyStream(stream);
                return getInitSignal(stream, socket);
            })
            .then(signal => socket.emit('NEW_CALL_SIGNAL', {
                dest,
                data: signal
            }));
    });

    socket.on('SOMEONE_CALL_YOU', signalData => {
        const {
            data,
            idSender
        } = signalData;
        startCamera()
            .then(stream => getAnswerSignal(stream, socket, data))
            .then(myData => socket.emit('ACCEPT_SIGNAL', {
                idSender,
                data: myData
            }));

    });
});

//https://socket.io/docs/emit-cheatsheet/
// startCamera()
// .then(stream => {
//     playMyStream(stream);
//     const p = new Peer({ 
//         initiator: true, 
//         trickle: false,
//         stream 
//     });
//     p.on('signal', function(data) {
//         socket.emit('NEW_CALL_SIGNAL', { dest, data });
//     });

//     socket.on('RECEIVE_ACCEPTION', data => {
//         p.signal(data);
//     });

//     p.on('stream', stream2 => playFriendStream(stream2));
// })
// .catch(err => console.log(err));

// socket.on('SOMEONE_CALL_YOU', signalData =>{
//    const { data, idSender } = signalData;
// startCamera()
// .then(stream => {
//     playMyStream(stream);
//     const p = new Peer({ 
//         initiator: false, 
//         trickle: false,
//         stream 
//     });
//     p.signal(data);
//     p.on('signal', function(myData) {
//         socket.emit('ACCEPT_SIGNAL', { idSender, data: myData });
//     });
//     p.on('stream', stream2 => playFriendStream(stream2));
// })
// .catch(err => console.log(err));
//});