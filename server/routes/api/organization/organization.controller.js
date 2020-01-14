let Organization = require('./organization.model')
let User = require('../user/user.model')

module.exports = {
  findAll: (req, res, next) => {
    Organization.find()
      .then(organization => res.json(organization))
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