const knex = require("knex");
const knexfile = require('../db/knexfile');

const db = knex(knexfile.development);

const tablename = 'galery';

module.exports = {
    insertGalery: (req, cb) => {
        db(`${tablename}`).insert({
            filename: req.filename,
            type: req.type,
            show_on_page: req.show_on_page
        }).then((data) => {
            return cb(null, data);
        }).catch((error) => {
            return cb(error);
        })
    },
    deleteGalery: (req, cb) => {
        db(`${tablename}`).where('id_galery', req.id)
        .del()
        .then(() => {
            return cb(null, "success delete");
        }).catch((error) => {
            return cb(error);
        })
    },
    getGalery: (req, cb) => {
        db(`${tablename}`).where('id_galery', req.id)
        .select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
    getAllGalery: (cb) => {
        db(`${tablename}`).select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    }
}