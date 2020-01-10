let Roles = require('./roles.model')

module.exports = {
  findAll: (req, res) => {
    Roles.find()
      .then(user => res.json(user))
      .catch(error => console.log(error))
  },
  findById: (req, res) => {
    Roles.findById(req.params.id)
      .then(user => res.json(user))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    Roles.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(user => res.json(user))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    Roles.create({...req.body})
      .then(user => res.json(user))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    Roles.findOneAndDelete({_id: req.params.id})
      .then(user => res.json(user))
      .catch(error => console.log(error))
  }
}