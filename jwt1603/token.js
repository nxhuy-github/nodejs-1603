const { sign, verify } = require('jsonwebtoken');

const key = 'slfjaslfj;s';

// sign({ user: 'huy' }, 'slfjaslfj;s', (err, token) => {
//     if (err) return console.log(err);
//     console.log(token);
// });

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaHV5IiwiaWF0IjoxNDk0OTM4OTU3fQ.aYTwZRePZN6gz6X2T7NSViX6kwbInV7pY_TMEfg9Y7U`;

// verify(token, key, (err, obj) => {
//     console.log(obj);
// });

const jwtSign = (data) => (
    new Promise((resolve, reject) => {
        sign(data, key, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    })
);

const jwtVerify = data => (
    new Promise((resolve, reject) => {
        verify(data, key, (err, obj) => {
            if (err) return reject(err);
            resolve(obj);
        });
    })
);

module.exports = { jwtSign, jwtVerify };
