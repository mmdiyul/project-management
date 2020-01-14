let Report = require('./report.model')

module.exports = {
  findAll: (req, res, next) => {
    Report.find()
      .then(report => res.json(report))
      .catch(error => next(error))
  },
  findById: (req, res, next) => {
    Report.findById(req.params.id)
      .then(report => res.json(report))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Report.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(report => res.json(report))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Report.create({...req.body})
      .then(report => res.json(report))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Report.findOneAndDelete({_id: req.params.id})
      .then(report => res.json(report))
      .catch(error => next(error))
  }
}