const {
    deleteGalery,
    getAllGalery,
    getGalery,
    insertGalery
} = require('../service/galery.service');
const fs = require('fs-extra');
const { ERROR, SUCCESS } = require('../helper/response');
const { galerySchema } = require('../helper/validation.schema');
const upload = require('../helper/multer');

module.exports = {
    uploadToGalery: (req, res, next) => {
        upload(req, res, async (error) => {
            if(error) return ERROR(res, 500, error);

            if(req.body.show_on_page == null) req.body.show_on_page = false;
            req.body.filename = req.file.filename;
            req.body.type = req.file.mimetype.split('/')[0];

            try{
                await galerySchema.validateAsync(req.body);
            }catch(err){
                return ERROR(res, 500, err.details[0].message);
            }
            insertGalery(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);
                
                result.id = result[0];
                getGalery(result, (errors, results) => {
                    if(errors) return ERROR(res, 500, errors);
                    if(results.length == 0) return ERROR(res, 404, "Data not found");

                    req.body.coverUrl = results[0].filename;
                    req.params.id = result[0];
                    next();
                })
            });
        });
    },
    deleteFromGalery: (req, res) => {
        req.body.id = req.params.id;
        getGalery(req.body, async (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 404, "Data not found");
            
            await fs.remove(`public/images/${result[0].filename}`);
            deleteGalery(req.body, (errors, results) => {
                if(errors) return ERROR(res, 500, errors);
                
                return SUCCESS(res, 200, results);
            })
        });
    },
    detailGalery: (req, res) => {
        req.body.id = req.params.id;
        getGalery(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 404, "Data not found");
            
            return SUCCESS(res, 200, result);
        })
    },
    allGalery: (req, res) => {
        getAllGalery((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    }
}