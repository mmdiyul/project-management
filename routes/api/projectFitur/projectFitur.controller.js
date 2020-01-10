let ProjectFitur = require('./projectFitur.model')

module.exports = {
  findAll: (req, res) => {
    ProjectFitur.find()
      .then(projectfitur => res.json(projectfitur))
      .catch(error => console.log(error))
  },
  findById: (req, res) => {
    ProjectFitur.findById(req.params.id)
      .then(projectfitur => res.json(projectfitur))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    ProjectFitur.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(projectfitur => res.json(projectfitur))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    ProjectFitur.create({...req.body})
      .then(projectfitur => res.json(projectfitur))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    ProjectFitur.findOneAndDelete({_id: req.params.id})
      .then(projectfitur => res.json(projectfitur))
      .catch(error => console.log(error))
  }
}