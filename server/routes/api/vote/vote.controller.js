let Vote = require('./vote.model')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = Vote.countDocuments(where)
    const data = Vote.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
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
    Vote.findById(req.params.id)
      .then(vote => res.json(vote))
      .catch(error => next(error))
  },
  updateById: (req, res,next) => {
    Vote.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(user => res.json(user))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Vote.create({...req.body})
      .then(vote => res.json(vote))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Vote.findOneAndDelete({_id: req.params.id})
      .then(vote => res.json(vote))
      .catch(error => next(error))
  }
}