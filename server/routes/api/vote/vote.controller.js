let Vote = require('./vote.model')

module.exports = {
  findAll: (req, res) => {
    Vote.find()
      .then(vote => res.json(vote))
      .catch(error => console.log(error))
  },
  findById: (req, res) => {
    Vote.findById(req.params.id)
      .then(vote => res.json(vote))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    Vote.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(user => res.json(user))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    Vote.create({...req.body})
      .then(vote => res.json(vote))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    Vote.findOneAndDelete({_id: req.params.id})
      .then(vote => res.json(vote))
      .catch(error => console.log(error))
  }
}