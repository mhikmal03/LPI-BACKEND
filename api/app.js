const express = require('express');
const app = express();
const router = express.Router()

const adminRouter = require('./route/admin.router');
const reviewRouter = require('./route/review.router');
const galeryRouter = require('./route/galery.router');
const dampakRouter = require('./route/dampak.router');
const bukuRouter = require('./route/buku.router');
const donasiRouter = require('./route/donasi.router');
const subscribeRouter = require('./route/subscribe.router');
const articleRouter = require('./route/article.router');



app.use('/admin', adminRouter);
app.use('/review', reviewRouter);
app.use('/galery', galeryRouter);
app.use('/proyek', dampakRouter);
app.use('/buku', bukuRouter);
app.use('/donasi', donasiRouter);
app.use('/subscribe', subscribeRouter);
app.use('/article', articleRouter )





app.get('', (req, res) => {
    res.json("you're consume api");
});

module.exports = app;