const Roles = require('./roles.model')
const User = require('../user/user.model')
const { query, parseWhere } = require('../../helpers')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
    const count = Roles.countDocuments(where)
    const search = req.query.search
    if(search){
      where['$or'] = [{
        nama: {'$regex': search, '$options': 'i'}
      },{
        deskripsi: {'$regex': search, '$options': 'i'}
      }]
    }
    const data = Roles.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
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
    Roles.findById(req.params.id)
      .then(roles => res.json(roles))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Roles.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(roles => res.json(roles))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Roles.create({...req.body})
      .then(roles => res.json(roles))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Promise.all([
      Roles.findOneAndDelete({_id: req.params.id}),
      User.deleteMany({roleId: req.params.id})
    ])
      .then(roles => res.json(roles))
      .catch(error => next(error))
  }
}