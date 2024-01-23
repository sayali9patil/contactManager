// TO get error message in json formate than in html format 
const constants = require("../constants");
const errorHandler = (err, req, res, next) =>
{
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                tittle: "Not found", 
                message: err.message, 
                stackTrace: err.stack
            });
        case constants.NOT_FOUND: 
            res.json({
                tittle: "Not found", 
                message: err.message, 
                stackTrace: err.stack
            });
        
        case constants.FORBIDDEN: 
            res.json({
            tittle: "Forbidden", 
            message: err.message, 
            stackTrace: err.stack
            });
        case constants.UNAUTHORIZED: 
            res.json({
            tittle: "Unauthorized", 
            message: err.message, 
            stackTrace: err.stack
            });
        
        case constants.SERVER_ERROR: 
            res.json({
            tittle: "Server Error", 
            message: err.message, 
            stackTrace: err.stack
            });

        default:
            break;
    }
};

module.exports = errorHandler; 