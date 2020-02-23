const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('No accept this file'));
    }
}

const limits = {
    //fieldNameSize: 100,
    //fieldSize: 50,
    fileSize: 300 * 1024
};
//~ const upload = multer({storage: storage, fileFilter: fileFilter, limits: limits});
const upload = multer({ storage, fileFilter, limits }); 

module.exports = upload;
