let Report = require('./report.model')

module.exports = {
  findAll: (req, res) => {
    Report.find()
      .then(report => res.json(report))
      .catch(error => console.log(error))
  },
  findById: (req, res) => {
    Report.findById(req.params.id)
      .then(report => res.json(report))
      .catch(error => console.log(error))
  },
  updateById: (req, res) => {
    Report.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(report => res.json(report))
      .catch(error => console.log(error))
  },
  insert: (req, res) => {
    Report.create({...req.body})
      .then(report => res.json(report))
      .catch(error => console.log(error))
  },
  removeById: (req, res) => {
    Report.findOneAndDelete({_id: req.params.id})
      .then(report => res.json(report))
      .catch(error => console.log(error))
  }
}