let Fitur = require('./fitur.model')
const { query, parseWhere } = require('../../helpers')

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
        let page = parseInt(req.query.page)
        let perPage = parseInt(req.query.perPage)
        if (!perPage) { perPage = 5 }
        const pageCount = Math.ceil(cb[1].length / perPage)
        if (!page) { page = 1 }
        if (page > pageCount) {
          page = pageCount
        }
        res.json({
            count: cb[0],
            page: page,
            pageCount: pageCount,
            results: cb[1].slice(page * perPage - perPage, page * perPage)
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
