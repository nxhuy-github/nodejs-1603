const express = require('express');

const app = express();

app.listen(3000, () => console.log('Server start'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home',
        { 
            names: ['Khoa', 'Pham', 'Huy', 'Node'], 
            isAdmin: true
        }
    )
});


class Phim{
    constructor(name, id){
        this.name = name;
        this.id = id;
    }
}

const arrPhim = [
    new Phim('1', '-8xeaGI3ReY'),
    new Phim('2', '8TqnjMqU8Ow'),
    new Phim('3', 'XAuY-HAXsrw'),
    new Phim('4', '8d7UiFcx6SQ')
];

app.get('/show', (req, res) => {
    res.render('home', {mang: arrPhim})
});