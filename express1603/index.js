const express = require('express');
const PhepTinh = require('./PhepTinh.js');
const bodyParser = require('body-parser');
const parser = bodyParser.urlencoded({extended: false}); // tạm thời chưa quan tâm nó là gì 

const app = express();

app.set('view engine', 'ejs');
//app.set('views', './view');
app.use(express.static('public'));

app.listen(3000, () => console.log('Server start'));

// http://localhost:3000/show/100/nguyenxuanhuy

/*app.get('/show/:id/:name', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    res.send('Hello World: ' + id + " : " + name);

});*/
app.get('/show/:id/:name', require('./controller/showController.js'));


/*app.get('/tinh/:pt/:a/:b', (req, res) => {
    // const pt = req.params.pt;
    // const a = req.params.a;
    // const b = req.params.b;
    const {pt, a, b} = req.params;

    const x = new PhepTinh(pt, a, b);
    try {
        res.send(x.getResultString());
    } catch (error) {
        res.send(error + '');
    }

});*/

app.get('/tinh/:pt/:a/:b', require('./controller/pheptinhController.js'));

app.get('/form', (req, res) => {
    res.render('./form.ejs');
 /*   const html = `
        <form action="/name" method ="post" >
            <input type="text" name="username" placeholder="Username"/>
            <br>
            <input type="password" name="password" placeholder="Password"/>
            <br>
            <button>Push</button>
        </form>
    `;
    res.send(html);*/
});

app.get('/tinh', (req, res) =>{
    res.render('./calcul.ejs');
});

app.get('/home', (req, res) => res.render('./home.ejs'));

app.post('/name', parser, (req, res) => { // hiểu đơn giản request là đi qua 1 cổng soát vé tên "parser"
    console.log(req.body);
    res.send('POST METHOD DETECTED');
});

app.post('/calcul', parser, require('./controller/pheptinhController_post.js'));

