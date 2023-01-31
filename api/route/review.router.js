const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../helper/middleware');
const {
    postReview,
    deleteReview,
    allReview,
    updateReview,
    detailReview
} = require('../controller/review.controller');

router.get('/', allReview);
router.get('/admin/', tokenValidation, allReview);
router.post('/', postReview);
router.get('/:id', detailReview);
router.put('/:id', tokenValidation, updateReview);
router.delete('/:id', tokenValidation, deleteReview);

module.exports = router;