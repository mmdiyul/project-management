let Roles = require('./roles.model')
let User = require('../user/user.model')

module.exports = {
  findAll: (req, res) => {
    Roles.find()
      .then(roles => res.json(roles))
      .catch(error => console.log(error))
  },
  findById: (req, res) => {
    Roles.findById(req.params.id)
      .then(roles => res.json(roles))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    Roles.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(roles => res.json(roles))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    Roles.create({...req.body})
      .then(roles => res.json(roles))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    Promise.all([
      Roles.findOneAndDelete({_id: req.params.id})
        .then(roles => res.json(roles))
        .catch(error => console.log(error)),
      User.deleteMany({roleId: req.params.id})
    ])
  }
}