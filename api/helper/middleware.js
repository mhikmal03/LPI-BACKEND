const { verify } = require('jsonwebtoken');
const { ERROR } = require('./response');

module.exports = {
    tokenValidation: (req, res, next) => {
        let token;
        try{
            token = req.get('authorization');
        }catch(err){
            return ERROR(res, 500, "Access denied!");
        }
        if(!token) return ERROR(res, 500, "Access denied!");
        token = token.slice(7);

        verify(token, process.env.APP_KEY, {algorithms: "HS256"}, (error, decoded) => {
            if(error) return ERROR(res, 500, error);

            if(!decoded.admin.id) return ERROR(res, 409, "Account doesnt admin");
            req.decoded = decoded;
            next();
        })
    }
}