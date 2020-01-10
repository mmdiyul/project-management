let Project = require('./project.model')

module.exports = {
  findAll: (req, res) => {
    Project.find()
      .then(project => res.json(project))
      .catch(error => console.log(error))
  },
  findById: (req, res) => {
    Project.findById(req.params.id)
      .then(project => res.json(project))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    Project.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(project => res.json(project))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    Project.create({...req.body})
      .then(project => res.json(project))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    Project.findOneAndDelete({_id: req.params.id})
      .then(project => res.json(project))
      .catch(error => console.log(error))
  }
}