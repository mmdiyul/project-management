let Fitur = require('./fitur.model')

module.exports = {
  findAll: (req, res) => {
    Fitur.find()
      .then(fitur => res.json(fitur))
      .catch(error => console.log(error))
  },
  findById: (req, res) => {
    Fitur.findById(req.params.id)
      .then(fitur => res.json(fitur))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    Fitur.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(fitur => res.json(fitur))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    Fitur.create({...req.body})
      .then(fitur => res.json(fitur))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    Fitur.findOneAndDelete({_id: req.params.id})
      .then(fitur => res.json(fitur))
      .catch(error => console.log(error))
  }
}