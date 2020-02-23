const pg = require('pg');
const fs = require('fs');

const config = {
    host: 'localhost',
    port: 5432,
    database: 'NODE1603',
    user: 'postgres',
    password: '123456'
};

const pool = new pg.Pool(config);


function query(sql, arrayData) {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) return reject(err);
            client.query(sql, arrayData, (errQ, result) => {
                done(errQ);
                if (errQ) return reject(errQ);
                resolve(result);
            });
        });
    });
}

// query('SELECT * FROM "User"', [])
// .then(result => result.rows[0].id)
// .then(param => console.log(param))
// .catch(err => console.log(err));

function writePromise(filename, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(data), (err) => {
            if (err) return reject(err);
            resolve('File has been saved');
        });
    });
}

// writePromise('huy.txt', 'Hello Huy JS')
// .then(result => console.log(result))
// .catch(err => console.log(err));

function queryAndSave(sql, arrayData, file) {
    return query(sql, arrayData)
        .then(result => writePromise(file, result.rows));
}

queryAndSave('SELECT * FROM "User"', [], 'query.text')
.then(result => console.log(result));