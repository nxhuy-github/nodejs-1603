module.exports = (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    res.send('Hello World: ' + id + " : " + name);

};