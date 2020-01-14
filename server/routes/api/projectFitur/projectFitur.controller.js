let ProjectFitur = require('./projectFitur.model')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = ProjectFitur.countDocuments(where)
    const data = ProjectFitur.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
    Promise.all([count, data])
      .then(cb=>{
        res.json({
            count: cb[0],
            results: cb[1]
        })
      })
      .catch(error => next(error))
  },
  findById: (req, res, next) => {
    ProjectFitur.findById(req.params.id)
      .then(projectfitur => res.json(projectfitur))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    ProjectFitur.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(projectfitur => res.json(projectfitur))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    ProjectFitur.create({...req.body})
      .then(projectfitur => res.json(projectfitur))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    ProjectFitur.findOneAndDelete({_id: req.params.id})
      .then(projectfitur => res.json(projectfitur))
      .catch(error => next(error))
  }
}