let Organization = require('./organization.model')

module.exports = {
  findAll: (req, res) => {
    Organization.find()
      .then(organization => res.json(organization))
      .catch(error => console.log(error))
  },
  findById: (req, res) => {
    Organization.findById(req.params.id)
      .then(organization => res.json(organization))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    Organization.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(organization => res.json(organization))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    Organization.create({...req.body})
      .then(organization => res.json(organization))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    Organization.findOneAndDelete({_id: req.params.id})
      .then(organization => res.json(organization))
      .catch(error => console.log(error))
  }
}