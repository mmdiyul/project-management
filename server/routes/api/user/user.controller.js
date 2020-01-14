let User = require('./user.model')

module.exports = {
  findAll: (req, res, next) => {
    User.find()
      .then(user => res.json(user))
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