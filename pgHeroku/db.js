const pg = require('pg');

const config = {
    host: 'ec2-54-235-72-121.compute-1.amazonaws.com',
    port: 5432,
    database: 'dq0enishq13s0',
    user: 'nmxziysuihmevu',
    password: '040a702382e5fa2ec028f4a6739c25ddddbe4f228081987e5d11017b4f056ac3',
    ssl: true
};

const pool = new pg.Pool(config);


function query(sql, cb) {
    pool.connect((err, client, done) => {
        if (err) return cb(err);
        client.query(sql, (errQuery, result) => {
            if (errQuery) return cb(errQuery);
            cb(undefined, result);
        });
    });
}

//query('SELECT * FROM "User"', (err, result) => console.log(result));

module.exports = { query };
