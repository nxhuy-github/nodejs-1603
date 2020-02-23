// const add = (a, b, cb) => {
//     setTimeout(() => {
//         const err = typeof a !== 'number' || typeof b !== 'number';
//         if(err) return cb(new Error('THAM SO PHAI CO KIEU NUMBER', undefined));
//         cb(undefined, a+b);
//     }, 500);
// };

// const multiple = (a, b, cb) => {
//     setTimeout(() => {
//         const err = typeof a !== 'number' || typeof b !== 'number';
//         if(err) return cb(new Error('THAM SO PHAI CO KIEU NUMBER', undefined));
//         cb(undefined, a*b);
//     })
// };

// const divise = (a, b, cb) => {
//     setTimeout(() => {
//         const err = typeof a !== 'number' || typeof b !== 'number';
//         if(err) return cb(new Error('THAM SO PHAI CO KIEU NUMBER', undefined));
//         if(b === 0) return cb(new Error('SO CHIA PHAI KHAC 0', undefined));
//         cb(undefined, a/b);
//     });
// };

// module.exports = { add, multiple, divise };

const divise = (a, b, cb) => {
    setTimeout((err, result) => {
        if(err) return cb(new Error('THAM SO PHAI CO KIEU NUMBER', undefined));
        if(b === 0) return cb(new Error('SO CHIA PHAI KHAC 0', undefined));
        cb(undefined, a/b);
    });
};
divise(4, 2, (err, result) => console.log(result));