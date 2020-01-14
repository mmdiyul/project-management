let ProjectFitur = require('./projectFitur.model')

module.exports = {
  findAll: (req, res, next) => {
    ProjectFitur.find()
      .then(projectfitur => res.json(projectfitur))
      .catch(error => next(error))
  },
  findById: (req, res, next) => {
    ProjectFitur.findById(req.params.id)
      .then(projectfitur => res.json(projectfitur))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    ProjectFitur.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(projectfitur => res.json(projectfitur))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    ProjectFitur.create({...req.body})
      .then(projectfitur => res.json(projectfitur))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    ProjectFitur.findOneAndDelete({_id: req.params.id})
      .then(projectfitur => res.json(projectfitur))
      .catch(error => next(error))
  }
}