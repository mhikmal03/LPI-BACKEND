const knex = require("knex");
const knexfile = require('../db/knexfile');

const db = knex(knexfile.development);

const tablename = 'review';

module.exports = {
    insertReview: (req, cb) => {
        db(`${tablename}`).insert({
            username: req.username,
            userProfession: req.userProfession,
            testimoni: req.testimoni
        }).then(() => {
            return cb(null, "success submit");
        }).catch((error) => {
            return cb(error);
        })
    },
    updateReview: (req, cb) => {
        db(`${tablename}`).where('id', req.id)
        .update({
            username: req.username,
            userProfession: req.userProfession,
            testimoni: req.testimoni
        }).then(() => {
            return cb(null, "success update");
        }).catch((error) => {
            return cb(error);
        })
    },
    deleteReview: (req, cb) => {
        db(`${tablename}`).where('id', req.id)
        .del()
        .then(() => {
            return cb(null, "success delete");
        }).catch((error) => {
            return cb(error);
        })
    },
    getReview: (req, cb) => {
        db(`${tablename}`).where('id', req.id)
        .select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
    getAllReview: (cb) => {
        db(`${tablename}`).select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    }
}