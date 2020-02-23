const pg = require('pg');
const bcrypt = require('bcrypt');

const config = {
    host: 'localhost',
    port: 5432,
    database: 'NODE1603',
    user: 'postgres',
    password: '123456'
};

const pool = new pg.Pool(config);


function query(sql, arr, cb) {  // them Arr
    pool.connect((err, client, done) => {
        if (err) return cb(err);
        client.query(sql, arr, (errQuery, result) => {
            done(errQuery);
            if (errQuery) return cb(errQuery);
            cb(undefined, result);
        });
    });
}

const insertUser = (username, password, email, name, cb) => {
    const sql = `INSERT INTO public."User"(username, password, email, name)
	            VALUES ($1, $2, $3, $4);`;
                // ~ VALUES ('${username}', '${password}', '${email}', '${name}')
    //query(sql, cb);
    query(sql, [username, password, email, name], (err) => {
        if (err) return cb(err);
        cb(undefined);
    });
};

// const checkSignIn = (username, password, cb) => {
//     const sql = `SELECT username, password
// 	            FROM public."User"
//                 WHERE username = '${username}' and password = '${password}';`;
//     query(sql, (err, result) => {
//         if (err) return cb(err);
//         if (result.rowCount !== 1) return cb('SAI THONG TIN');
//         cb(undefined);
//     });
// };

const checkSignIn = (username, password, cb) => {
    const sql = `SELECT password
                FROM public."User"
                WHERE username = $1;`;
    query(sql, [username], (err, result) => {
        if (err) return cb(err);
        if (result.rowCount !== 1) return cb('SAI THONG TIN');
        //console.log(result.rows[0].password);
        bcrypt.compare(password, result.rows[0].password, (errHash, res) => {
            if (res === true) return cb(undefined);
            //cb(errHash);
            cb('DANG NHAP KHONG THANH CONG');
        });
    });
};

// insertUser('nxhuy', '123456', 'nxhuy@gmail.com', 'huy', (err) => { //(err, result) => {}
//     if (err) return console.log(err.toString());
//     //console.log(result.rows);
//     console.log('Dang ky thanh cong');
// });

// checkSignIn('nxhuy', '123456', (err) => {
//     if (err) console.log(err.toString());
//     console.log('Dang Nhap thanh cong');
// });

module.exports = { insertUser, checkSignIn, query };

