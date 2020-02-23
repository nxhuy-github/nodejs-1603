const $ = require('jquery');


const xuLyDangKy = (socket) => {
    $('#btnSignUp').click(() => {
        const username = $('#txtUsername').val();
        socket.emit('CLIENT_SIGN_UP', username);

        socket.on('CONFIRM_SIGN_UP', arrUsername =>{
            if(arrUsername){
                arrUsername.forEach(e => {
                    $('#ulUser').append(`<li id="${e}">${e}</li>`);                    
                });
                socket.on('NEW_USER', username => {
                    $('#ulUser').append(`<li id="${username}">${username}</li>`);
                });
                $('#divChat').show();
                return $('#divSignUp').hide();
            }
            alert('User was existe');
        });
    });

    socket.on('USER_LOG_OUT', username =>{
        $(`#${username}`).remove();
    });
};

module.exports = xuLyDangKy;