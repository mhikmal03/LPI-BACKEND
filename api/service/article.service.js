const knex = require('knex')

const knexfile = require('../db/knexfile');
const db = knex(knexfile.development);


module.exports = {
    getAllArticle: (cb) => {
        db('article').select()
            .then((result) => {
                return cb(null, result);
            }).catch((error) => {
                return cb(error);
            })
    },

    insertArticle: (req, cb) => {
        db('article').insert({
            coverUrl: req.coverUrl,
            title: req.title,
            author: req.author,
            content: req.content,
        }).then((res) => {
            return cb(null, "success insert");
        }).catch((error) => {
            return cb(error);
        })
    },

    deleteArticle: (req, cb) => {
        db('article').where('id', req.id).del().then(() => {
            return cb(null, "success delete");
        }).catch((error) => {
            return cb(error);
        })
    },

    getArticle: (req, cb) => {
        db(`article`)
        .where('id', req.id)
        .select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
}