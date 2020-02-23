const pg = require('pg');

const config = {
    host: 'localhost',
    port: 5432,
    database: 'NODE1603',
    user: 'postgres',
    password: '123456'
};

const pool = new pg.Pool(config);

function query(sql, arr, cb) {
    pool.connect((err, client, done) => {
        //if (err) return console.log('LOI:', err);
        if (err) return cb(err, undefined);
        client.query(sql, arr, (errQuery, result) => {
            //if (errQuery) return console.log(errQuery);
            if (errQuery) return cb(errQuery, undefined);
            cb(undefined, result);
        });
    });
}

// query('SELECT * FROM "TinTuc"', (err, result) => {
//     if (err) return console.log(err);
//     console.log(result.rows);
// });

module.exports = { query };
