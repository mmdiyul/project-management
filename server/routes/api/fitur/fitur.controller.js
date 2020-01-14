let Fitur = require('./fitur.model')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = Fitur.countDocuments(where)
    const search = req.query.search
    if(search){
      where['$or'] = [{
        nama: {'$regex': search, '$options': 'i'}
      }]
    }
    const data = Fitur.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
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
    Fitur.findById(req.params.id)
      .then(fitur => res.json(fitur))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Fitur.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(fitur => res.json(fitur))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Fitur.create({...req.body})
      .then(fitur => res.json(fitur))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Fitur.findOneAndDelete({_id: req.params.id})
      .then(fitur => res.json(fitur))
      .catch(error => next(error))
  }
}
