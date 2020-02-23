const Peer = require('simple-peer');
const $ = require('jquery');


navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
    .then(stream => {
        const video = document.querySelectorAll('video')[0];
        video.src = window.URL.createObjectURL(stream);
        video.play();

        const p = new Peer({
            initiator: location.hash === '#1',
            trickle: false, // eslint-disable-line
            stream
        });

        p.on('signal',
            data => $('#connectId').text(JSON.stringify(data)));

        p.on('connect', () => {
            console.log('CONNECT');
            p.send('whatever' + Math.random());
        });

        p.on('data', data => console.log(data.toString()));

        p.on('stream', stream1 => {
            const video1 = document.querySelectorAll('video')[1];
            video1.src = window.URL.createObjectURL(stream1);
            video1.play();
        });

        $('#btnConnect').click(() => {
            const otherId = $('#otherId').val();
            p.signal(JSON.parse(otherId));
        });

        $('#bntSend').click(() => {
            const message = $('#txtMessage').val();
            p.send(message);
        });

    })
    .catch(err => console.log(err));