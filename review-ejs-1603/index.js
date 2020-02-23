const express = require('express');
const Tin = require('./Tin'); 
const bodyP = require('body-parser');
const upload = require('multer')({ dest: './public' });
const { getAllData } = require('./db');

const parser = bodyP.urlencoded({ extended: false });

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => console.log('Server started'));

// image, id, title, des


const arrTins = [
    new Tin('Tin 1', 'Day la Tin 1', '108018156', '1.jpg'),
    new Tin('Tin 2', 'Day la Tin 2', '108018156', '1.jpg'),
    new Tin('Tin 3', 'Day la Tin 3', '145118246', '1.jpg'),
    new Tin('Tin 4', 'Day la Tin 4', '108018156', '1.jpg'),
    new Tin('Tin 5', 'Day la Tin 5', '145118246', '1.jpg')
];

app.get('/', (req, res) => {
    res.render('home', { arrTin: arrTins });
});

app.get('/admin', (req, res) => {
    //res.render('admin', { arrTin: arrTins });
    getAllData((err, result) => {
        if (err) return res.send(`LOI: ${err}`);
        res.render('admin', { arrTin: result.rows });
    });
});

app.post('/add', parser, (req, res) => {
    const newTin = new Tin(req.body.title, req.body.desc, req.body.idVideo, req.body.image);
    arrTins.push(newTin);
    res.redirect('/admin');
});

app.get('/xoa/:id', (req, res) => {
    const id = req.params.id;
    arrTins.splice(id, 1);
    res.redirect('/admin');
});

app.get('/sua/:id', (req, res) => {
    const mid = req.params.id;
    const tin = arrTins[mid];
    tin.index = mid;
    res.render('update', { t: tin });
});

app.post('/update', parser, (req, res) => {
    const mid = req.body.index;
    const updateTin = new Tin(req.body.title, req.body.desc, req.body.idVideo, req.body.image);
    arrTins.splice(mid, 1);
    arrTins.splice(mid, 0, updateTin);
    res.redirect('/admin');
});

app.get('/upload', (req, res) => {
    res.render('upload');
});

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.send('Thanh Cong');
});
