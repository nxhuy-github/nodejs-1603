const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000, () => console.log('Server started'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.render('home'));

io.on('connection', socket => {
    //console.log(socket.id);
    socket.on('CLIENT-SEND-MSG', data => {
        console.log(data);
        //socket.emit('SERVER-SEND-MSG', data * data); // gửi cho thằng client đã gủi request lên server
        //io.emit('SERVER-SEND-MSG', data * data); // gửi cho tất cả mọi client đang connect tới server
        io.emit('SERVER-SEND-MSG', data);
    });
});
