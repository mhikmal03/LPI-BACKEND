const {
    insertDonasi,
    getAllDonasi,
    deleteDonasi,
    getDonasi
} = require('../service/donasi.service');
const { ERROR, SUCCESS } = require('../helper/response');
const { donasiSchema } = require('../helper/validation.schema');

module.exports = {
    postDonasi: async (req, res) => {
        try{
            await donasiSchema.validateAsync(req.body);
        }catch(err){
            return ERROR(res, 500, err.details[0].message);
        }
        insertDonasi(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    },
    allDonasi: (req, res) => {
        getAllDonasi((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    },
    deleteDonasi: (req, res) => {
        req.body.id = req.params.id;
        getDonasi(req.body, (err, reslt) => {
            if(err) return ERROR(res, 500, err);
            if(reslt.length == 0) return ERROR(res, 404, "Data not found");
        
            deleteDonasi(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);
                
                return SUCCESS(res, 200, result);
            });
        });
    },
}