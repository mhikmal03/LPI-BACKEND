const knex = require("knex");
const knexfile = require('../db/knexfile');

const db = knex(knexfile.development);

const tablename = 'proyek'
const upload = require('../helper/multer_array');
const { json } = require("body-parser");


module.exports = {
    insertDampak: (req, res, cb) => {
        upload(req, res, async (error) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }
          
            // Use destructuring to extract the relevant fields from the request body
            const { thumbnail, nama, lokasi, tanggal, content, dampak_sebelum, dampak_sesudah, dokumentasi } = req.body;
          
            // Map over the files array to extract the filenames
            const images = req.files.map(file => file.filename);
          
            // Use Knex to insert the data into the database
            try {
              const result = await db('proyek').insert({
                thumbnail,
                image: JSON.stringify(images),
                nama,
                lokasi,
                tanggal,
                content,
                dampak_sebelum,
                dampak_sesudah,
                dokumentasi
              });
          
              const id = result[0];
              return res.status(200).json({ message: "success submit project"});
            } catch (err) {
              return res.status(500).json({ error: err.message });
            }
          });
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
        // db(`${tablename}`).select()
        // .join('galery', 'galery.id_galery', `${tablename}.thumbnail`)
        // .then((result) => {
        //     return cb(null, result);
        // }).catch((error) => {
        //     return cb(error);
        // })
        db(`${tablename}`).select()
            .then((result) => {
                return cb(null, result);
            }).catch((error) => {
                return cb(error);
            })
    },
    getDampak: (req, cb) => {
        db(`${tablename}`)
            .select().where('id', req.id)
            .then((result) => {
                return cb(null, result);
            }).catch((error) => {
                return cb(error);
            })
    }
}