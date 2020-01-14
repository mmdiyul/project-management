let Project = require('./project.model')

module.exports = {
  findAll: (req, res, next) => {
    Project.find()
      .then(project => res.json(project))
      .catch(error => next(error))
  },
  findById: (req, res, next) => {
    Project.findById(req.params.id)
      .then(project => res.json(project))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Project.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(project => res.json(project))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Project.create({...req.body})
      .then(project => res.json(project))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Project.findOneAndDelete({_id: req.params.id})
      .then(project => res.json(project))
      .catch(error => next(error))
  }
}