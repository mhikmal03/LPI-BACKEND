const knex = require("knex");
const knexfile = require('../db/knexfile');

const db = knex(knexfile.development);

const tablename = 'buku'

module.exports = {
    insertBuku: (req, cb) => {
        db(`${tablename}`).insert({
            coverUrl: req.coverUrl,
            judul: req.judul,
            penulis: req.penulis,
            negara: req.negara,
            bahasa: req.bahasa,
            genre: req.genre,
            penerbit: req.penerbit,
            tahun: req.tahun,
            halaman: req.halaman,
            ringkasan: req.ringkasan,
            review: req.review
        }).then(() => {
            return cb(null, "success submit");
        }).catch((error) => {
            return cb(error);
        })
    },
    updateBuku: (req, cb) => {
        db(`${tablename}`)
        .where(`id`, req.id)
        .update({
            coverUrl: req.coverUrl,
            judul: req.judul,
            penulis: req.penulis,
            negara: req.negara,
            bahasa: req.bahasa,
            genre: req.genre,
            penerbit: req.penerbit,
            tahun: req.tahun,
            halaman: req.halaman,
            ringkasan: req.ringkasan,
            review: req.review
        }).then(() => {
            return cb(null, "success update");
        }).catch((error) => {
            return cb(error);
        })
    },
    deleteBuku: (req, cb) => {
        db(`${tablename}`).where(`id`, req.id)
        .del()
        .then(() => {
            return cb(null, "success delete");
        }).catch((error) => {
            return cb(error);
        })
    },
    getBuku: (req, cb) => {
        db(`${tablename}`)
        .where('id', req.id)
        .select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
    getAllBuku: (cb) => {
        db(`${tablename}`).select()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    }
}