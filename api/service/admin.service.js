const knex = require("knex");
const knexfile = require('../db/knexfile');

const db = knex(knexfile.development);

const tablename = 'admin'

module.exports = {
    getAdminByUsername: (req, cb) => {
        db(`${tablename}`).select()
        .where({firstName: req.firstName, lastName: req.lastName})
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
    insertAdmin: (req, cb) => {
        db(`${tablename}`).insert({
            firstName: req.firstName,
            lastName: req.lastName,
            password: req.password
        })
        .returning('id')
        .then((result) => {
            db(`${tablename}`).select()
            .where('id', result[0].id)
            .then((result) => {
                delete result[0].password;
                return cb(null, result)
            }).catch((error) => {
                return cb(error);
            })
        }).catch((error) => {
            return cb(error);
        })
    },
    updateAdmin: (req, cb) => {
        db(`${tablename}`).where('id', req.id)
        .update({
            firstName: req.firstName,
            lastName: req.lastName
        }).then((result) => {
            delete result[0].password;
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
    deleteAdmin: (req, cb) => {
        db(`${tablename}`).where('id', req.id)
        .del()
        .then((result) => {
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
    getAllAdmin: (cb) => {
        db(`${tablename}`).select()
        .then((result) => {
            if(result.length > 0){
                for (const account in result) {
                    delete account.password;
                }
            }
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    },
    checkExistAdmin: (req, cb) => {
        db(`${tablename}`)
        .select()
        .where(db.raw(`CONCAT(CONCAT("firstName", ' '), "lastName")`), req.username)
        .count()
        .then((result) => {
            return cb(null, result[0].count);
        }).catch((error) => {
            return cb(error);
        })
    },
    getAdmin: (req, cb) => {
        db(`${tablename}`)
        .select()
        .where('id', req.id)
        .then((result) => {
            delete result[0].password;
            return cb(null, result);
        }).catch((error) => {
            return cb(error);
        })
    }
}