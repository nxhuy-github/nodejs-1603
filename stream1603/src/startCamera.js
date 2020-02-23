const startCamera = () => (
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })// eslint-disable-line
);  // trả về 1 Promise (y)
module.exports = startCamera;
