const PhepTinh = require('../PhepTinh.js');

module.exports = (req, res) => {
    const pt = req.body.pheptinh;
    const a = req.body.number1;
    const b = req.body.number2;

    //const {pt, a, b} = req.body;

    const x = new PhepTinh(pt, a, b);
    try {
        res.send(x.getResultString());
    } catch (error) {
        res.send(error + '');
    }

};