let User = require('./user.model')

module.exports = {
  findAll: (req, res) => {
    User.find()
      .then(user => res.json(user))
      .catch(error => console.log(error))
  },
  findById: (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    User.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(user => res.json(user))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    User.create({...req.body})
      .then(user => res.json(user))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    User.findOneAndDelete({_id: req.params.id})
      .then(user => res.json(user))
      .catch(error => console.log(error))
  }
}