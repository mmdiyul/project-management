const { query, validationResult }  = require('express-validator');

exports.checkQuery = [query('limit').isNumeric().toInt(), query('offset').isNumeric().toInt()]
exports.validationResult = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else{
        if(req.method=='PUT'){
            delete req.body._id
            delete req.body.__v
        }
        next()
    }
}