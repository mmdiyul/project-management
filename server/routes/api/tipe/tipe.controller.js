let Tipe = require('./tipe.model')
const { query, parseWhere } = require('../../helpers')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = Tipe.countDocuments(where)
    const search = req.query.search
    if(search){
      where['$or'] = [{
        nama: {'$regex': search, '$options': 'i'}
      },{
        deskripsi: {'$regex': search, '$options': 'i'}
      }]
    }
    const data = Tipe.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
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
    Tipe.findById(req.params.id)
      .then(tipe => res.json(tipe))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Tipe.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(tipe => res.json(tipe))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Tipe.create({...req.body})
      .then(tipe => res.json(tipe))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Tipe.findOneAndDelete({_id: req.params.id})
      .then(tipe => res.json(tipe))
      .catch(error => next(error))
  }
}