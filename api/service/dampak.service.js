const knex = require("knex");
const knexfile = require('../db/knexfile');

const db = knex(knexfile.development);

const tablename = 'proyek'

module.exports = {
    insertDampak: (req, cb) => {
        db(`${tablename}`).insert({
            thumbnail: req.thumbnail,
            nama: req.nama,
            lokasi: req.lokasi,
            tanggal: req.tanggal,
            content: req.content,
            dampak_sebelum: req.dampak_sebelum,
            dampak_sesudah: req.dampak_sesudah,
            dokumentasi: req.dokumentasi
        }).then(() => {
            return cb(null, "success submit");
        }).catch((error) => {
            return cb(error);
        })
    },
    updateDampak: (req, cb) => {
        db(`${tablename}`).where('id', req.id)
        .update({
            thumbnail: req.thumbnail,
            nama: req.nama,
            lokasi: req.lokasi,
            tanggal: req.tanggal,
            content: req.content,
            dampak_sebelum: req.dampak_sebelum,
            dampak_sesudah: req.dampak_sesudah,
            link_foto: req.link
        }).then(() => {
            return cb(null, "success update");
        }).catch((error) => {
            return cb(error);
        })
    },
    deleteDampak: (req, cb) => {
        db(`${tablename}`).where('id', req.id)
        .del()
        .then(() => {
            return cb(null, "success delete");
        }).catch((error) => {
            return cb(error);
        })
    },
    getAllDampak: (cb) => {
        db(`${tablename}`).select()
        .join('galery', 'galery.id_galery', `${tablename}.thumbnail`)
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
    getDampak: (req, cb) => {
        db(`${tablename}`)
        .join('galery', 'galery.id_galery', `${tablename}.thumbnail`)
        .select().where('id', req.id)
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    }
}