const express = require('express');
const session = require('express-session');
const { query } = require('./db');

const app = express();

app.listen(process.env.PORT || 3000, () => console.log('Server start!'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 7000 }
}));

app.get('/', (req, res) => res.send('Still alive!!!'));

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM "User"';
    query(sql, (err, result) => {
        if (err) return res.send(err);
        res.send(result.rows);
    });
});

app.get('/muave', (req, res) => {
    req.session.daMuaVe = true ;
    res.send('Ban da mua ve');
});


const requireSignIn = (req, res, next) => {
    if (req.session.daMuaVe) return next();
    res.send('Ban Phai Mua Ve');
};

app.get('/vaorap', requireSignIn, (req, res) => {
    req.session.a ? req.session.a++ : req.session.a = 1;
    // console.log(req.session.a);
    // if (req.session.daMuaVe) return res.send('Moi ban xem phim');
    // res.send('Ban phai mua ve truoc');
    res.send('Moi xem phim');
});

