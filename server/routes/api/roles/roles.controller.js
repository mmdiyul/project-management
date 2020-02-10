const Roles = require('./roles.model')
const User = require('../user/user.model')
const { query, parseWhere } = require('../../helpers')

module.exports = {
  findAll: (req, res, next) => {
    let page = parseInt(req.params.page) || 1
    let { where, limit, offset, sort } = query(req.query)
    if (page) {
      offset = (limit * page) - limit
    }
    const search = req.query.search
    if(search){
      where['$or'] = [{
        nama: {'$regex': search, '$options': 'i'}
      },{
        deskripsi: {'$regex': search, '$options': 'i'}
      }]
    }
    const count = Roles.countDocuments(where)
    const data = Roles.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
    Promise.all([count, data])
      .then(cb=>{
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        let url = fullUrl.split('roles')
        let urlPage = url[1].split('/')
        let urlQuery = url[1].split('?')
        let prevUrl, nextUrl
        if ((urlQuery == "" || urlPage[0] == "") && (urlQuery == "" || urlQuery[1] == null)) {
          prevUrl = url[0] + "roles/page/" + (page - 1)
          nextUrl = url[0] + "roles/page/" + (page + 1)
        } else {
          prevUrl = url[0] + "roles/page/" + (page - 1) + "?" + urlQuery[1]
          nextUrl = url[0] + "roles/page/" + (page + 1) + "?" + urlQuery[1]
        }
        if (!page || page == 1) {
          prevUrl = null
        }
        const pageCount = Math.ceil(cb[0] / limit)
        if (page >= pageCount) {
          page = pageCount
          nextUrl = null
        }
        res.json({
            count: cb[0],
            page: page,
            pageCount: pageCount,
            prevUrl: prevUrl,
            nextUrl: nextUrl,
            results: cb[1]
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