let Vote = require('./vote.model')
let Fitur = require('../fitur/fitur.model')
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
    .populate('userId', 'nama')
    .populate('fiturId', 'nama waktuPengerjaan kesulitan estimasiHarga')

    Promise.all([count, data])
      .then(cb=>{
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        let url = fullUrl.split('vote')
        let urlPage = url[1].split('/')
        let urlQuery = url[1].split('?')
        let prevUrl, nextUrl
        if ((urlQuery == "" || urlPage[0] == "") && (urlQuery == "" || urlQuery[1] == null)) {
          prevUrl = url[0] + "vote/page/" + (page - 1)
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
  updateById: (req, res, next) => {
    const voteAwal = Vote.findOne({_id: req.params.id})
    Promise.all([voteAwal])
      .then(cb => {
        Vote.findOneAndUpdate(
          {_id: req.params.id},
          {$set: req.body},
          {new: true}
        )
          .then(vote => {
            const allData = Vote.find({fiturId: vote.fiturId})
            const fitur = Fitur.findOne({_id: vote.fiturId})
            Promise.all([vote, fitur, allData])
              .then(cba => {
                let voteAwalKesulitan = cb[0].kesulitan
                let voteAwalHarga = cb[0].harga
                let voteKesulitan = cba[0].kesulitan
                let voteHarga = cba[0].harga
                let fiturKesulitan = cba[1].kesulitan
                let fiturHarga = cba[1].estimasiHarga
                let jumlahVote = cba[2].length

                let hasilKesulitan = (((fiturKesulitan * jumlahVote) - voteAwalKesulitan) + voteKesulitan) / jumlahVote
                let hasilHarga = (((fiturHarga * jumlahVote) - voteAwalHarga) + voteHarga) / jumlahVote

                const updateFitur = Fitur.findOneAndUpdate(
                  {_id: vote.fiturId},
                  {$set: {kesulitan: hasilKesulitan, estimasiHarga: hasilHarga}},
                  {new: true}
                )
                Promise.all([updateFitur])
                  .then(cbaf => {
                    res.json({
                      voteAwal: cb[0],
                      vote: cba[0],
                      fitur: cba[1],
                      fiturBaru: cbaf[0]
                    })
                  })                
                  .catch(error => next(error))
              })
              .catch(error => next(error))
          })
          .catch(error => next(error))
      })
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    Vote.create({...req.body})
      .then(vote => {
        const allData = Vote.find({fiturId: vote.fiturId})
        const fitur = Fitur.findOne({_id: vote.fiturId})
        Promise.all([vote, fitur, allData])
          .then(cb => {
            let voteKesulitan = cb[0].kesulitan
            let voteHarga = cb[0].harga
            let jumlahData = cb[2].length
            let fiturKesulitan = cb[1].kesulitan
            let fiturHarga = cb[1].estimasiHarga

            let hasilKesulitan, hasilHarga
            
            if (jumlahData == 1) {
              hasilKesulitan = (fiturKesulitan + voteKesulitan)
              hasilHarga = (fiturHarga + voteHarga)
            } else {
              hasilKesulitan = ((fiturKesulitan * (jumlahData - 1)) + voteKesulitan) / jumlahData
              hasilHarga = ((fiturHarga * (jumlahData - 1)) + voteHarga) / jumlahData
            }

            const updateFitur = Fitur.findOneAndUpdate(
              {_id: vote.fiturId},
              {$set: {kesulitan: hasilKesulitan, estimasiHarga: hasilHarga}},
              {new: true}
            )
            Promise.all([updateFitur])
              .then(cba => {
                res.json({
                  vote: cb[0],
                  fitur: cba[0]
                })
              })
              .catch(error => next(error))
          })
          .catch(error => next(error))
      })
      .catch(error => next(error))
  },
  removeById: (req, res, next) => {
    const voteAwal = Vote.findOne({_id: req.params.id})
    Promise.all([voteAwal])
      .then(cb => {
        Vote.findOneAndDelete({_id: req.params.id})
          .then(vote => {
            const allData = Vote.find({fiturId: vote.fiturId})
            const fitur = Fitur.findOne({_id: vote.fiturId})
            Promise.all([fitur, allData])
              .then(cba => {
                let voteAwalKesulitan = cb[0].kesulitan
                let voteAwalHarga = cb[0].harga
                let fiturKesulitan = cba[0].kesulitan
                let fiturHarga = cba[0].estimasiHarga
                let jumlahVote = cba[1].length

                let hasilHarga, hasilKesulitan

                if (jumlahVote == 0) {
                  hasilKesulitan = 0
                  hasilHarga = 0
                } else {
                  hasilKesulitan = ((fiturKesulitan * (jumlahVote + 1)) - voteAwalKesulitan) / jumlahVote
                  hasilHarga = ((fiturHarga * (jumlahVote + 1)) - voteAwalHarga) / jumlahVote
                }

                const updateFitur = Fitur.findOneAndUpdate(
                  {_id: vote.fiturId},
                  {$set: {kesulitan: hasilKesulitan, estimasiHarga: hasilHarga}},
                  {new: true}
                )
                Promise.all([updateFitur])
                  .then(cbaf => {
                    res.json({
                      voteAwal: cb[0],
                      fitur: cba[0],
                      fiturBaru: cbaf[0]
                    })
                  })                
                  .catch(error => next(error))
              })
              .catch(error => next(error))
          })
          .catch(error => next(error))
      })
  }
}