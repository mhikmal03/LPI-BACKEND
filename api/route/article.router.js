const express = require('express')
const router = express.Router()
const { tokenValidation } = require('../helper/middleware.js');

const { postArticle, allArticle, delArticle, getArticleId, pagination  } = require('../controller/article.controller');
const { uploadToGalery } = require('../controller/galery.controller.js');


// user allowed
router.get('/', allArticle);

// pagination
// http:localhost.../api/article/pagination?table=buku&page=0&pageSize=3
router.get('/pagination', pagination)


// admin only
router.get('/admin', tokenValidation, allArticle);
router.get('/:id', tokenValidation, getArticleId);
router.post('/', tokenValidation, uploadToGalery, postArticle);
router.delete('/:id', tokenValidation, delArticle);

module.exports = router;
