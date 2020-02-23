const pg = require('pg');

const config = {
    host: 'localhost',
    port: 5432,
    database: 'NODE1603',
    user: 'postgres',
    password: '123456'
};

const pool = new pg.Pool(config);

function query(sql, cb) {
    pool.connect((err, client, done) => {
        //if (err) return console.log('LOI:', err);
        if(err) return cb(err, undefined);
        client.query(sql, (errQuery, result) => {
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

function getAllData(cb) {
    const sql = 'SELECT * FROM "TinTuc"';
    query(sql, cb);
}

function insertNews(title, desc, idVideo, image){
    query(`INSERT INTO public."TinTuc"(title, "desc", "idVideo", image)
	VALUES (${title}, ${desc}, ${idVideo}, ${image});`)
}

function deleteNews(id){

}

function updateNews(id, title, desc, idVideo, image){

}

getAllData((err, result) => {
    console.log(result.rows);
});