const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../helper/middleware');
const {
    postBuku,
    deleteBuku,
    allBuku,
    updateBuku,
    detailBuku
} = require('../controller/buku.controller');
const { uploadToGalery } = require('../controller/galery.controller');

router.get('/', allBuku);
router.get('/admin/', tokenValidation, allBuku);
router.post('/', tokenValidation, uploadToGalery, postBuku);
router.get('/:id', detailBuku)
router.put('/:id', tokenValidation, updateBuku);
router.delete('/:id', tokenValidation, deleteBuku);

module.exports = router;