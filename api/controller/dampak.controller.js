const {
    insertDampak,
    deleteDampak, 
    getAllDampak,
    getDampak, 
    updateDampak
} = require('../service/dampak.service');
const { ERROR, SUCCESS } = require('../helper/response');
const { dampakSchema } = require('../helper/validation.schema');

module.exports = {
    postDampak: async (req, res) => {
        if(req.body.tanggal == null) req.body.tanggal = new Date();
        try{
            await dampakSchema.validateAsync(req.body);
        }catch(err){
            return ERROR(res, 500, err.details[0].message);
        }
        insertDampak(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    },
    updateDampak: async (req, res) => {
        try{
            await dampakSchema.validateAsync(req.body);
        }catch(err){
            return ERROR(res, 500, err.details[0].message);
        }
        req.body.id = req.params.id;
        getDampak(req.body, (err, reslt) => {
            if(err) return ERROR(res, 500, err);
            if(reslt.length == 0) return ERROR(res, 404, "Data not found");
            
            updateDampak(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);
                
                return SUCCESS(res, 200, result);
            });
        });
    },
    deleteDampak: (req, res) => {
        req.body.id = req.params.id;
        getDampak(req.body, (err, reslt) => {
            if(err) return ERROR(res, 500, err);
            if(reslt.length == 0) return ERROR(res, 404, "Data not found");
            
            deleteDampak(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);
                
                return SUCCESS(res, 200, result);
            });
        });
    },
    allDampak: (req, res) => {
        getAllDampak((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    },
    detailDampak: (req, res) => {
        req.body.id = req.params.id;
        getDampak(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 404, "Data not found");
            
            return SUCCESS(res, 200, result);
        })
    }
}