const express = require('express')
const router = express.Router()
const { tokenValidation } = require('../helper/middleware.js');

const { postArticle, allArticle, delArticle, getArticleId } = require('../controller/article.controller')


// user allowed
router.get('/', allArticle);

// admin only
router.get('/admin', tokenValidation, allArticle);
router.get('/:id', tokenValidation, getArticleId);
router.post('/', tokenValidation, postArticle);
router.delete('/:id', tokenValidation, delArticle);

module.exports = router;
