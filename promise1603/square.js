const { add, multiple, divise } = require('./index.js');

const getSquare = (a, b, h, cb) => {
    add(a, b, (err, result) => {
        if (err) return cb(err, undefined);
        multiple(result, h, (err2, result2) => {
            if (err2) return cb(err2, undefined);
            divise(result2, 2, (err3, result3) => {
                if (err3) return cb(err3, undefined);
                cb(undefined, result3)
            });
        });
    });
};

