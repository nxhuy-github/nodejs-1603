const PhepTinh = require('../PhepTinh.js');

module.exports = (req, res) => {
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

};