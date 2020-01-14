let User = require('./user.model')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = User.countDocuments(where)
    const search = req.query.search
    if(search){
      where['$or'] = [{
        nama: {'$regex': search, '$options': 'i'}
      },{
        username: {'$regex': search, '$options': 'i'}
      },{
        email: {'$regex': search, '$options': 'i'}
      }]
    }
    const data = User.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
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
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    User.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(user => res.json(user))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    User.create({...req.body})
      .then(user => res.json(user))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    User.findOneAndDelete({_id: req.params.id})
      .then(user => res.json(user))
      .catch(error => next(error))
  }
}