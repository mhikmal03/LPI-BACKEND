const { insertArticle, getAllArticle, deleteArticle, getArticle } = require('../service/article.service')
const { ERROR, SUCCESS } = require('../helper/response');
const upload = require('../helper/multer');
const knex = require('knex')
const knexfile = require('../db/knexfile');
const db = knex(knexfile.development);



module.exports = {
    allArticle: (req, res) => {
        getAllArticle((error, result) => {
            if (error) return ERROR(res, 500, error);
            return SUCCESS(res, 200, result);
        })
    },



    postArticle: async (req, res) => {
        
        try {
            if (req.method !== 'POST') return res.status(405).end();
        } catch (err) {
            return ERROR(res, 500, err.details[0].message);
        }
        insertArticle(req.body, (error, result) => {
            if (error) return ERROR(res, 500, error);
            return SUCCESS(res, 200, result);
        })
    },

    delArticle: async (req, res) => {
        req.body = req.params;
        try {
            if (req.method !== 'DELETE') return res.status(405).end();
        } catch (err) {
            return ERROR(res, 500, err.details[0].message);
        }
        deleteArticle(req.body, (error, result) => {
            if (error) return ERROR(res, 500, error);
            return SUCCESS(res, 200, result);
        })
    },

    getArticleId: async (req, res) => {
        req.body.id = req.params.id;
        try {
            if (req.method !== 'GET') return res.status(405).end();
        } catch (err) {
            return ERROR(res, 500, err.details[0].message);
        }
        getArticle(req.body, (error, result) => {
            if (error) return ERROR(res, 500, error);
            return SUCCESS(res, 200, result);
        })
    },

    pagination: async (req, res) => {
        const page = parseInt(req.query.page) || 0;
        const pageSize = parseInt(req.query.pageSize) || 3;
        const startIndex = page * pageSize;
        const dbtable = req.query.table;
        try{
            const data = await db(`${dbtable}`).select().limit(pageSize).offset(startIndex);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).end();
        }   
    }
}