let Tipe = require('./tipe.model')
const { query, parseWhere } = require('../../helpers')

module.exports = {
  findAll: (req, res, next) => {
    let page = parseInt(req.params.page) || 1
    let { where, limit, offset, sort } = query(req.query)
    if (page) {
      offset = (limit * page) - limit
    }
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
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        let url = fullUrl.split('tipe')
        let urlPage = url[1].split('/')
        let urlQuery = url[1].split('?')
        let prevUrl, nextUrl
        if ((urlQuery == "" || urlPage[0] == "") && (urlQuery == "" || urlQuery[1] == null)) {
          prevUrl = url[0] + "tipe/page/" + (page - 1)
          nextUrl = url[0] + "tipe/page/" + (page + 1)
        } else {
          prevUrl = url[0] + "tipe/page/" + (page - 1) + "?" + urlQuery[1]
          nextUrl = url[0] + "tipe/page/" + (page + 1) + "?" + urlQuery[1]
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