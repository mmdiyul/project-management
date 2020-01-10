let Tipe = require('./tipe.model')

module.exports = {
  findAll: (req, res) => {
    Tipe.find()
      .then(tipe => res.json(tipe))
      .catch(error => console.log(error))
  },
  findById: (req, res) => {
    Tipe.findById(req.params.id)
      .then(tipe => res.json(tipe))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    Tipe.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(tipe => res.json(tipe))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    Tipe.create({...req.body})
      .then(tipe => res.json(tipe))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    Tipe.findOneAndDelete({_id: req.params.id})
      .then(tipe => res.json(tipe))
      .catch(error => console.log(error))
  }
}