let Vote = require('./vote.model')
const { query, parseWhere } = require('../../helpers')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = Vote.countDocuments(where)
    const data = Vote.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
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
    Vote.findById(req.params.id)
      .then(vote => res.json(vote))
      .catch(error => next(error))
  },
  updateById: (req, res,next) => {
    Vote.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(user => res.json(user))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Vote.create({...req.body})
      .then(vote => res.json(vote))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Vote.findOneAndDelete({_id: req.params.id})
      .then(vote => res.json(vote))
      .catch(error => next(error))
  }
}