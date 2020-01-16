let Vote = require('./vote.model')
const { query, parseWhere } = require('../../helpers')

module.exports = {
  findAll: (req, res, next) => {
    let page = parseInt(req.params.page) || 1
    let { where, limit, offset, sort } = query(req.query)
    if (page) {
      offset = (limit * page) - limit
    }
    const count = Vote.countDocuments(where)
    const data = Vote.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
    Promise.all([count, data])
      .then(cb=>{
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        let url = fullUrl.split('vote')
        let urlPage = url[1].split('/')
        let urlQuery = url[1].split('?')
        let prevUrl, nextUrl
        if ((urlQuery == "" || urlPage[0] == "") && (urlQuery == "" || urlQuery[1] == null)) {
          prevUrl = url[0] + "user/page/" + (page - 1)
          nextUrl = url[0] + "vote/page/" + (page + 1)
        } else {
          prevUrl = url[0] + "vote/page/" + (page - 1) + "?" + urlQuery[1]
          nextUrl = url[0] + "vote/page/" + (page + 1) + "?" + urlQuery[1]
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