const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
        cb(null, 'LP' + new Date().getMonth() + 
        new Date().getFullYear() + new Date().getDate() +
        Math.random().toString(35).slice(3) + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const type = file.mimetype.split('/')[0];
    if(type !== 'image' && type !== 'video'){
        cb(null, false);
        cb(new Error('only image or video can be upload'));
    }
    cb(null, true);
}
const upload = multer({
    storage: storage, 
    fileFilter: fileFilter,
    limits: {fileSize: 100 * 1024 * 1024}
}).single('file');

module.exports = upload;