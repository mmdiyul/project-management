let Organization = require('./organization.model')
let User = require('../user/user.model')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = Organization.countDocuments(where)
    const search = req.query.search
    if(search){
      where['$or'] = [{
        nama: {'$regex': search, '$options': 'i'}
      },{
        alamat: {'$regex': search, '$options': 'i'}
      },{
        telepon: {'$regex': search, '$options': 'i'}
      },{
        email: {'$regex': search, '$options': 'i'}
      },{
        website: {'$regex': search, '$options': 'i'}
      }]
    }
    const data = Organization.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
    Promise.all([count, data])
      .then(cb=>{
        res.json({
            count: cb[0],
            results: cb[1]
        })
      })
      .catch(error => next(error))
  },
  findById: (req, res, next) => {
    Organization.findById(req.params.id)
      .then(organization => res.json(organization))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Organization.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(organization => res.json(organization))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Organization.create({...req.body})
      .then(organization => res.json(organization))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Promise.all([
      Organization.findOneAndDelete({_id: req.params.id}),
      User.updateMany({organizationId: null})
    ])
      .then(organization => res.json(organization))
      .catch(error => next(error))
  }
}