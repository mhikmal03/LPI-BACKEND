const express = require('express');
const router = express.Router();
const { tokenValidation } = require('../helper/middleware');
const {
    allSubsriber,
    postSubscribe,
    deleteSubscribe
} = require('../controller/subscribe.controller');

router.get('/', tokenValidation, allSubsriber);
router.post('/', postSubscribe);
router.delete('/:id', deleteSubscribe);

module.exports = router;