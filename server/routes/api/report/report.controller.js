let Report = require('./report.model')
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
        pesan: {'$regex': search, '$options': 'i'}
      }]
    }
    const count = Report.countDocuments(where)
    const data = Report.find(where).limit(limit).skip(offset).sort(sort).select('-__v')
      .populate('userId', 'nama')
      .populate('fiturId', 'nama waktuPengerjaan kesulitan estimasiHarga')

    Promise.all([count, data])
      .then(cb=>{
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        let url = fullUrl.split('report')
        let urlPage = url[1].split('/')
        let urlQuery = url[1].split('?')
        let prevUrl, nextUrl
        if ((urlQuery == "" || urlPage[0] == "") && (urlQuery == "" || urlQuery[1] == null)) {
          prevUrl = url[0] + "report/page/" + (page - 1)
          nextUrl = url[0] + "report/page/" + (page + 1)
        } else {
          prevUrl = url[0] + "report/page/" + (page - 1) + "?" + urlQuery[1]
          nextUrl = url[0] + "report/page/" + (page + 1) + "?" + urlQuery[1]
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