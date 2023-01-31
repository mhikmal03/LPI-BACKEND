const knex = require("knex");
const knexfile = require('../db/knexfile');

const db = knex(knexfile.development);

const tablename = 'subscribe'

module.exports = {
    insertSubscribe: (req, cb) => {
        db(`${tablename}`).insert({
            email: req.email
        }).then(() => {
            return cb(null, "success submit");
        }).catch((error) => {
            return cb(error);
        })
    },
    deleteSubscribe: (req, cb) => {
        db(`${tablename}`).where('id', req.id)
        .del()
        .then(() => {
            return cb(null, "success delete");
        }).catch((error) => {
            return cb(error);
        })
    },
    getAllSubscriber: (cb) => {
        db(`${tablename}`).select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
    getSubcriber: (req, cb) => {
        db(`${tablename}`).where(`id`, req.id)
        .select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
}