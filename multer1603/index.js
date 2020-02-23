const express = require('express');
const upload = require('./set-up-multer');

const app = express();
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(3000, () => console.log('Server started'));

app.use('/trangA', require('./trangA'));

app.get('/', (req, res) => {
    res.render('home');
});

const avatarUpload = upload.single('avatar');

app.post('/upload', avatarUpload, (req, res) => {
    avatarUpload(req, res, err => { // ~ avatarUpload(req, res, (err) => {...})
        if (err) return res.send(`LOI: ${err}`);
        res.send(`UPLOAD THANH CONG ${req.body.username}`);
    });
});
