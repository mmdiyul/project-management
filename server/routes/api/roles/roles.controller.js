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
    Promise.all([count, data])
      .then(cb=>{
        res.json({
            count: cb[0],
            results: cb[1]
        })
      })
      .catch(err => next(err))
  },
  findById: (req, res) => {
    Roles.findById(req.params.id)
      .then(roles => res.json(roles))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    Roles.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(roles => res.json(roles))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    Roles.create({...req.body})
      .then(roles => res.json(roles))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    Promise.all([
      Roles.findOneAndDelete({_id: req.params.id}),
      User.deleteMany({roleId: req.params.id})
    ])
      .then(roles => res.json(roles))
      .catch(error => console.log(error))
  }
}