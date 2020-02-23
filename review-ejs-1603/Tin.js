const query = require('./db');

class Tin {
    constructor(title, desc, idVideo, image) {
        this.title = title;
        this.desc = desc;
        this.idVideo = idVideo;
        this.image = image;
    }

    static getAllTin(cb) {
        const sql = 'SELECT * FROM "TinTuc";';
        query(sql, [], (err, result) => {
            if (err) return cb(err);
            if (result.rows === 0) return cb('Khong Co Tin Nao');
            const arr = [];
            result.rows.forEach(e => {
                const tin = new Tin(e.title, e.desc, e.idVideo, e.image);
                arr.push(tin);
            }, this);
        });
    }

    insertTin(cb) {
        const sql = `INSERT INTO public."TinTuc"(title, desc, idVideo, image)
	                VALUES ($1, $2, $3, $4);`;
        const { title, desc, idVideo, image } = this;
        query(sql, [title, desc, idVideo, image], (err) => {
            if (err) return cb(err);
            cb(undefined);
        });
    }

    updateTin(cb) {
        const sql = `UPDATE public."TinTuc"
	                SET title=$1, "desc"=$2, "idVideo"=$3, image=$4
	                WHERE id=$5;`;
        const { title, desc, idVideo, image } = this;
        query(sql, [title, desc, idVideo, image, this.id], (err) => {
            if (err) return cb(err);
            cb(undefined);
        });
    }

    deleteTin(cb) {
        const sql = `DELETE FROM public."TinTuc"
	                WHERE id=$1;`;
        query(sql, [this.id], (err) => {
            if (err) return cb(err);
            cb(undefined);
        });
    }
}
module.exports = Tin;
