let Project = require('./project.model')
const { query, parseWhere } = require('../../helpers')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = Project.countDocuments(where)
    const search = req.query.search
    if(search){
      where['$or'] = [{
        nama: {'$regex': search, '$options': 'i'}
      }]
    }
    const data = Project.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
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
    Project.findById(req.params.id)
      .then(project => res.json(project))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Project.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(project => res.json(project))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Project.create({...req.body})
      .then(project => res.json(project))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Project.findOneAndDelete({_id: req.params.id})
      .then(project => res.json(project))
      .catch(error => next(error))
  }
}