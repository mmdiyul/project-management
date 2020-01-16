let Organization = require('./organization.model')
let User = require('../user/user.model')
const { query, parseWhere } = require('../../helpers')

module.exports = {
  findAll: (req, res, next) => {
    let page = parseInt(req.params.page) || 1
    let { where, limit, offset, sort } = query(req.query)
    if (page) {
      offset = (limit * page) - limit
    }
    const count = Organization.countDocuments(where)
    const search = req.query.search
    if(search){
      where['$or'] = [{
        nama: {'$regex': search, '$options': 'i'}
      },{
        alamat: {'$regex': search, '$options': 'i'}
      },{
        telepon: {'$regex': search, '$options': 'i'}
      },{
        email: {'$regex': search, '$options': 'i'}
      },{
        website: {'$regex': search, '$options': 'i'}
      }]
    }
    const data = Organization.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
    Promise.all([count, data])
      .then(cb=>{
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        let url = fullUrl.split('organization')
        let urlPage = url[1].split('/')
        let urlQuery = url[1].split('?')
        let prevUrl, nextUrl
        if ((urlQuery == "" || urlPage[0] == "") && (urlQuery == "" || urlQuery[1] == null)) {
          prevUrl = url[0] + "organization/page/" + (page - 1)
          nextUrl = url[0] + "organization/page/" + (page + 1)
        } else {
          prevUrl = url[0] + "organization/page/" + (page - 1) + "?" + urlQuery[1]
          nextUrl = url[0] + "organization/page/" + (page + 1) + "?" + urlQuery[1]
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
    Organization.findById(req.params.id)
      .then(organization => res.json(organization))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    Organization.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(organization => res.json(organization))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Organization.create({...req.body})
      .then(organization => res.json(organization))
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    Promise.all([
      Organization.findOneAndDelete({_id: req.params.id}),
      User.updateMany({organizationId: null})
    ])
      .then(organization => res.json(organization))
      .catch(error => next(error))
  }
}