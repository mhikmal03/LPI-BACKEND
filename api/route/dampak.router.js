const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../helper/middleware');
const {
    postDampak,
    deleteDampak,
    allDampak,
    detailDampak,
    updateDampak
} = require('../controller/dampak.controller');

router.get('/', allDampak);
router.get('/admin/', tokenValidation, allDampak);
router.post('/', tokenValidation, postDampak);
router.get('/:id', detailDampak);
router.put('/:id', tokenValidation, updateDampak);
router.delete('/:id', tokenValidation, deleteDampak);

module.exports = router;