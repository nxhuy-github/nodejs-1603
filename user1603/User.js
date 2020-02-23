const { query } = require('./db');
const bcrypt = require('bcrypt');

class User {
    constructor(username, password, email, name, hashPassword, id) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.hashPassword = hashPassword;
    }

    insertUser(cb) {
        bcrypt.hash(this.password, 10, (err, encryted) => {
            const sql = `INSERT INTO public."User"(username, password, email, name)
	            VALUES ($1, $2, $3, $4);`;
            const { username, email, name } = this;
            query(sql, [username, encryted, email, name], (errQuery) => {
                if (errQuery) return cb(errQuery);
                cb(undefined);
            });
        });
    }

    checkSignIn(cb) {
        const sql = 'SELECT password FROM public."User" WHERE username = $1;';
        query(sql, [this.username], (err, result) => {
            if (err) return cb(err);
            if (result.rowCount !== 1) return cb('SAI THONG TIN');
                //console.log(result.rows[0].password);
            bcrypt.compare(this.password, result.rows[0].password, (errHash, res) => {
                if (res === true) return cb(undefined);
                    //cb(errHash);
                cb('DANG NHAP KHONG THANH CONG');
            });
        });
    }
}

module.exports = User;
