const Roles = require('./roles.model')
const User = require('../user/user.model')
const { query, parseWhere } = require('../../helpers')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = Roles.countDocuments(where)
    const search = req.query.search
    if(search){
      where['$or'] = [{
        name: {'$regex': search, '$options': 'i'}
      },{
        name_long: {'$regex': search, '$options': 'i'}
      },{
        description: {'$regex': search, '$options': 'i'}
      }]
    }
    const data = Roles.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
    Promise.all([count, data]).then(cb=>{
        res.json({
            count: cb[0],
            results: cb[1]
        })
    }, err=>next(err))
  },
  findById: (req, res, next) => {
    Roles.findById(req.params.id, (err, results) => {
      if(err) return next(err);
      res.json(results)
    })
  },
  updateById: (req, res, next) => {
    Roles.findOneAndUpdate(req.params.id, req.body, {new: true, upsert:false, multi: false}).exec((err, results) => {
      if(err) return next(err)
      res.json(results)
    })
  },
  insert: (req, res, next) => {
    Roles.create(req.body, (err, results) => {
      if(err) return next(err)
      res.json(results)
    })
  },
  removeById: (req, res) => {
    Promise.all([
      Roles.findByIdAndRemove(req.params.id).exec((err, results)=>{
        if(err) return next(err)
        res.json(results)
      }),
      User.deleteMany({roleId: req.params.id})
    ])
  }
}