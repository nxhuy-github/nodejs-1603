const express = require('express');
const bodyP = require('body-parser');
//const { insertUser, checkSignIn } = require('./db');
//const { hash } = require('bcrypt');
const User = require('./User');

const parser = bodyP.urlencoded({ extended: false });

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(3000, () => console.log('Server started'));

app.get('/', (req, res) => res.render('home'));

app.get('/signup', (req, res) => res.render('signup'));

app.get('/signin', (req, res) => res.render('signin'));

app.post('/signup', parser, (req, res) => {
    const { name, username, password, email } = req.body;
    const user = new User(username, password, email, name);
    user.insertUser(err => {
        if (err) return res.send(err);
        res.send('Dang Ky Thanh Cong');
    });
    // hash(password, 10, (err, encryted) => {
    //     insertUser(username, encryted, email, name, errQuery => {
    //         if (errQuery) return res.send('Loi Dang Ky');
    //         res.send('Dang Ky thang cong');
    //     });
    // });
});

app.post('/signin', parser, (req, res) => {
    const { username, password } = req.body;
    const user = new User(username, password);
    user.checkSignIn(err => {
        if (err) return res.send(err);
        res.send('Dang Nhap Thanh Cong');
    });
    // checkSignIn(username, password, err => {
    //     if (err) return res.send(`Loi Dang Nhap: ${err.toString()}`);
    //     res.send('Dang Nhap Thanh Cong');
    // });
});
