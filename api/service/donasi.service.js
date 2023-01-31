const knex = require("knex");
const knexfile = require('../db/knexfile');

const db = knex(knexfile.development);

const tablename = 'donasi'

module.exports = {
    insertDonasi: (req, cb) => {
        db(`${tablename}`).insert({
            judul: req.judul,
            step: req.step
        }).then(() => {
            return cb(null, "success submit");
        }).catch((error) => {
            return cb(error);
        })
    },
    getAllDonasi: (cb) => {
        db(`${tablename}`).select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
    deleteDonasi: (req, cb) => {
        db(`${tablename}`).where(`id`, req.id)
        .del()
        .then(() => {
            return cb(null, "success delete");
        }).catch((error) => {
            return cb(error);
        })
    },
    getDonasi: (req, cb) => {
        db(`${tablename}`).where(`id`, req.id)
        .select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
}