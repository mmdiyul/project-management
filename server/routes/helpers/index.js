const { map }  = require('underscore');
const createError = require('http-errors')
const { checkId, checkQuery, validationResult } = require('./req.validation')
const { ObjectId } = require('mongodb')
const { checkSchema } = require('express-validator')
const passport = require('passport')
exports.protect = passport.authenticate('jwt', {session: false})

exports.checkSchema = checkSchema
exports.checkId = checkId
exports.checkQuery = checkQuery
exports.validationResult = validationResult
exports.isDevMode = process.env.NODE_ENV === 'development'
exports.projectName = process.env.npm_package_name;
exports.createError = createError

exports.parseWhere = (where, i )=>{
    const inCaseSensitive = (i === 'true'|| i === 'TRUE' || i === '1' || i === 1)? true: false;
    map(where, (val, key)=>{
        if(typeof val === 'string' && inCaseSensitive){
            where[key] = {$regex: val, $options: "i"}
        }
    })
    return where;
}
exports.query = (query) =>{
    let where = {};
    let limit = 0;
    let offset = 0;
    let sort = { '_id': -1 };
    if(query.where) where = this.parseWhere(query.where, query.i);
    if(query.limit) limit = query.limit;
    if(query.offset) offset = query.offset || offset;
    const tempSort = {}
    if(query.sort && query.direction) {
      tempSort[query.sort] = (query.direction==='asc') ? 1 : -1;
    }
    if(Object.keys(tempSort).length > 0) sort = tempSort;
    return { where, limit, offset, sort}
}
exports.fname = (fname)=>{
    const splited = fname.split('/')
    return splited[splited.length-1]
}

exports.checkId = (req, res, next)=>{
    if(!ObjectId.isValid(req.params.id)) return next(createError(400,'Invalid ID'))
    next()
}
