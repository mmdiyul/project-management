let Vote = require('./vote.model')

module.exports = {
  findAll: (req, res, next) => {
    Vote.find()
      .then(vote => res.json(vote))
      .catch(error => console.log(error))
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