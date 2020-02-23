const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { jwtSign, jwtVerify } = require('./token');

const app = express();
const parser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());

const requireLogedIn = async (req, res, next) => {
    try {
        const obj = await jwtVerify(req.cookies.token);
        req.cookie = obj;// eslint-disable-line
        next();
    } catch (e) {
        res.send('Xin vui long dang nhap');
    }
};

const redirectIfLoggedIn = async (req, res, next) => {
    try {
        const obj = await jwtVerify(req.cookies.token);
        req.cookie = obj; // eslint-disable-line
        res.redirect('/private');
    } catch (error) {
        next();
    }
};

app.listen(3000, () => console.log('Server started'));

app.get('/', (req, res) => {
    res.cookie('AAA', 123);
    console.log(res.cookie);
    res.render('home');
});

app.get('/dangnhap', redirectIfLoggedIn, (req, res) => res.render('dangnhap'));

app.post('/dangnhap', parser, async (req, res) => {
    const { username, password } = req.body;
    const isExist = arrUser.some(e => e.username === username && e.password === password);
    if (!isExist) return res.send('Kiem tra thong tin dang nhap');
    
    const token = await jwtSign({ username });
    res.cookie('token', token);
    res.send('Dang nhap thanh cong');
});

app.get('/private', requireLogedIn, async (req, res) => {
    res.send('Xin chao ' + req.cookie.username);
});


const arrUser = [
    { username: 'teo', password: '123' },
    { username: 'ti', password: '456' },
    { username: 'tun', password: '789' },
];
