let Tipe = require('./tipe.model')

module.exports = {
  findAll: (req, res, next) => {
    Tipe.find()
      .then(tipe => res.json(tipe))
      .catch(error => next(error))
  },
  findById: (req, res, next) => {
    Tipe.findById(req.params.id)
      .then(tipe => res.json(tipe))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Tipe.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(tipe => res.json(tipe))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Tipe.create({...req.body})
      .then(tipe => res.json(tipe))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Tipe.findOneAndDelete({_id: req.params.id})
      .then(tipe => res.json(tipe))
      .catch(error => next(error))
  }
}