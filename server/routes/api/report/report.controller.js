let Report = require('./report.model')
const { query, parseWhere } = require('../../helpers')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = Report.countDocuments(where)
    const search = req.query.search
    if(search){
      where['$or'] = [{
        pesan: {'$regex': search, '$options': 'i'}
      }]
    }
    const data = Report.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
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
    Report.findById(req.params.id)
      .then(report => res.json(report))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Report.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(report => res.json(report))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Report.create({...req.body})
      .then(report => res.json(report))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Report.findOneAndDelete({_id: req.params.id})
      .then(report => res.json(report))
      .catch(error => next(error))
  }
}