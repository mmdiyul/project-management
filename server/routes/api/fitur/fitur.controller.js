let Fitur = require('./fitur.model')

module.exports = {
  findAll: (req, res, next) => {
    Fitur.find()
      .then(fitur => res.json(fitur))
      .catch(error => next(error))
  },
  findById: (req, res, next) => {
    Fitur.findById(req.params.id)
      .then(fitur => res.json(fitur))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Fitur.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(fitur => res.json(fitur))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Fitur.create({...req.body})
      .then(fitur => res.json(fitur))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Fitur.findOneAndDelete({_id: req.params.id})
      .then(fitur => res.json(fitur))
      .catch(error => next(error))
  }
}
