const { 
    insertAdmin,
    updateAdmin,
    deleteAdmin,
    getAdminByUsername,
    getAllAdmin,
    checkExistAdmin,
    getAdmin
} = require('../service/admin.service');
const { compareSync, genSaltSync, hashSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SUCCESS, ERROR } = require('../helper/response');
const { authSchema } = require('../helper/validation.schema');
const salt = genSaltSync(10);

module.exports = {
    register: (req, res) => {
        req.body.username = req.body.firstName + ' ' + req.body.lastName;
        checkExistAdmin(req.body, async (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result > 0) return ERROR(res, 409, "user is exist");
            delete req.body.username;
            try{
                await authSchema.validateAsync(req.body);
            }catch(err){
                return ERROR(res, 500, err.details[0].message);
            }
            req.body.password = hashSync(req.body.password, salt);
            insertAdmin(req.body, (error, result) => {
                if(error) return ERROR(res, 500, error);

                const token = sign({admin: result[0]}, process.env.APP_KEY, {algorithm: "HS256", expiresIn: "24h"});
                return SUCCESS(res, 200, {admin: result[0], token: token});
            });
        });
    },
    update: (req, res) => {
        req.body.id = req.params.id;
        updateAdmin(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        })
    },
    deleteAdmin: (req, res) => {
        req.body.id = req.params.id;
        deleteAdmin(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);

            return SUCCESS(res, 200, result);
        })
    },
    login: async (req, res) => {
        try{
            await authSchema.validateAsync(req.body);
        }catch(err){
            return ERROR(res, 500, err.details[0].message);
        }
        getAdminByUsername(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 404, "User not found");

            const verif = compareSync(req.body.password, result[0].password);
            if(!verif) return ERROR(res, 401, "password is incorrect");
            delete result[0].password;
            
            const token = sign({admin: result[0]}, process.env.APP_KEY, {algorithm: "HS256", expiresIn: "24h"});
            return SUCCESS(res, 200, {admin: result[0], token: token});
        })
    },
    allAdmin: (req, res) => {
        getAllAdmin((error, result) => {
            if(error) return ERROR(res, 500, error);
            
            return SUCCESS(res, 200, result);
        })
    },
    detailAdmin: (req, res) => {
        req.body.id = req.params.id;
        getAdmin(req.body, (error, result) => {
            if(error) return ERROR(res, 500, error);
            if(result.length == 0) return ERROR(res, 404, "Data not found");
            
            return SUCCESS(res, 200, result);
        })
    },
}