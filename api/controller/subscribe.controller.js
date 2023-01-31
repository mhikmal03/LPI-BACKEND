const {
    getAllSubscriber,
    insertSubscribe,
    deleteSubscribe,
    getSubcriber
} = require('../service/subscribe.service');
const { ERROR, SUCCESS } = require('../helper/response');
const { subscribeSchema } = require('../helper/validation.schema');

module.exports = {
    postSubscribe: async (req, res) => {
        try{
            await subscribeSchema.validateAsync(req.body);
        }catch(err){
            return ERROR(res, 500, err.details[0].message);
        }
        insertSubscribe(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    },
    deleteSubscribe: (req, res) => {
        req.body.id = req.params.id;
        getSubcriber(req.body, (err, reslt) => {
            if(err) return ERROR(res, 500, err);
            if(reslt.length == 0) return ERROR(res, 404, "Data not found");
        
            deleteSubscribe(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);
                
                return SUCCESS(res, 200, result);
            });
        });
    },
    allSubsriber: (req, res) => {
        getAllSubscriber((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    }
}