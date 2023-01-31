const {
    insertReview,
    deleteReview, 
    getAllReview,
    updateReview,
    getReview
} = require('../service/review.service');
const { ERROR, SUCCESS } = require('../helper/response');
const { reviewSchema } = require('../helper/validation.schema');

module.exports = {
    postReview: async (req, res) => {
        try{
            await reviewSchema.validateAsync(req.body);
        }catch(err){
            return ERROR(res, 500, err.details[0].message);
        }
        insertReview(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    },
    updateReview: async (req, res) => {
        try{
            await reviewSchema.validateAsync(req.body);
        }catch(err){
            return ERROR(res, 500, err.details[0].message);
        }
        req.body.id = req.params.id;
        getReview(req.body, (err, reslt) => {
            if(err) return ERROR(res, 500, err);
            if(reslt.length == 0) return ERROR(res, 404, "Data not found");
            
            updateReview(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);
                
                return SUCCESS(res, 200, result);
            });
        });
    },
    deleteReview: (req, res) => {
        req.body.id = req.params.id;
        getReview(req.body, (err, reslt) => {
            if(err) return ERROR(res, 500, err);
            if(reslt.length == 0) return ERROR(res, 404, "Data not found");
        
            deleteReview(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);
                
                return SUCCESS(res, 200, result);
            })
        });
    },
    detailReview: (req, res) => {
        req.body.id = req.params.id;
        getReview(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 404, "Data not found");
            
            return SUCCESS(res, 200, result);
        })
    },
    allReview: (req, res) => {
        getAllReview((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    }
}