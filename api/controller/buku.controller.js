const {
    insertBuku,
    deleteBuku, 
    getAllBuku,
    updateBuku,
    getBuku
} = require('../service/buku.service');
const { ERROR, SUCCESS } = require('../helper/response');
const { bukuSchema } = require('../helper/validation.schema');

module.exports = {
    postBuku: async (req, res) => {
        if(req.body.penulis == null) req.body.penulis = 'unknown';
        try{
            await bukuSchema.validateAsync(req.body);
        }catch(err){
            return ERROR(res, 500, err.details[0].message);
        }
        insertBuku(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    },
    updateBuku: async (req, res) => {
        if(req.body.penulis == null) req.body.penulis = 'unknown';
        try{
            await bukuSchema.validateAsync(req.body);
        }catch(err){
            return ERROR(res, 500, err.details[0].message);
        }
        req.body.id = req.params.id;
        getBuku(req.body, (err, reslt) => {
            if(err) return ERROR(res, 500, err);
            if(reslt.length == 0) return ERROR(res, 404, "Data not found");
        
            updateBuku(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);
                
                return SUCCESS(res, 200, result);
            });
        });
    },
    deleteBuku: (req, res) => {
        req.body.id = req.params.id;
        getBuku(req.body, (err, reslt) => {
            if(err) return ERROR(res, 500, err);
            if(reslt.length == 0) return ERROR(res, 404, "Data not found");
            
            deleteBuku(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);
                
                return SUCCESS(res, 200, result);
            });
        });
    },
    detailBuku: (req, res) => {
        req.body.id = req.params.id;
        getBuku(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 404, "Data not found");
            
            return SUCCESS(res, 200, result);
        })
    },
    allBuku: (req, res) => {
        getAllBuku((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    }
}