let User = require('./user.model')
const { query, parseWhere, createError } = require('../../helpers')
const { hash, compare } = require('bcrypt')

module.exports = {
  findAll: (req, res, next) => {
    let page = parseInt(req.params.page) || 1
    let { where, limit, offset, sort } = query(req.query)
    if (page) {
      offset = (limit * page) - limit
    }
    if(req.user && req.user.role.name=="admin"){
      where['role'] = req.user.role._id
    }
    const count = User.countDocuments(where)
    const search = req.query.search
    if(search){
      where['$or'] = [{
        nama: {'$regex': search, '$options': 'i'}
      },{
        username: {'$regex': search, '$options': 'i'}
      },{
        email: {'$regex': search, '$options': 'i'}
      }]
    }
    const data = User.find(where).limit(limit).skip(offset).sort(sort)
      .populate('roleId', 'nama deskripsi prioritas')
      .populate('createdBy', 'nama')
      .populate('updatedBy', 'nama')
    
    Promise.all([count, data])
      .then(cb=>{
        let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        let url = fullUrl.split('user')
        let urlPage = url[1].split('/')
        let urlQuery = url[1].split('?')
        let prevUrl, nextUrl
        if ((urlQuery == "" || urlPage[0] == "") && (urlQuery == "" || urlQuery[1] == null)) {
          prevUrl = url[0] + "user/page/" + (page - 1)
          nextUrl = url[0] + "user/page/" + (page + 1)
        } else {
          prevUrl = url[0] + "user/page/" + (page - 1) + "?" + urlQuery[1]
          nextUrl = url[0] + "user/page/" + (page + 1) + "?" + urlQuery[1]
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
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(error => next(error))
  },
  updateById: (req, res, next) => {
    User.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(user => res.json(user))
      .catch(error => next(error))
  },
  insert: (req, res, next) => {
    const newUser = createNewUser(req.body)
    newUser
      .then(user => res.json(user))
      .catch(error => next(error))
  },
  loginLocalStrategy: (username, passwd) => {
    return new Promise((resolve, reject)=>{
      const user = Users.findOne({ $or:[{email:username},{username}] })
      .populate('role')
      .select('id password username email nama roleId')
      user.then((foundUser)=>{
        if(!foundUser) return reject(createError(400,'Username atau Email tidak ditemukan!'))
        const { password } = foundUser
        console.log(passwd, password)
        const passwdValidation = compare(passwd, password)
        passwdValidation.then(isTrue=>{
            if(!isTrue) return reject(createError(400,'Password salah!'))
            return resolve(foundUser)
        }).catch(err=>{
            return reject(err)
        })
      })
    })
  },
  removeById: (req, res, next) => {
    User.findOneAndDelete({_id: req.params.id})
      .then(user => res.json(user))
      .catch(error => next(error))
  }
}

const createNewUser = (data) => {
  return new Promise((resolve, reject)=>{
    const findUsername = User.findOne({username: data.username})
    const findEmail = User.findOne({email: data.email})
    const hashPassword = hash(data.password,10)
    let actions = [findUsername, findEmail, hashPassword]

    Promise.all(actions)
      .then(cb=>{
        if(cb[0]) throw createError(400,'Username already registered!')
        if(cb[1]) throw createError(400,'Email already registered!')
        const hashedPassword = cb[2]
        data.password = hashedPassword;
        return User.create(data)
      })
      .then(results => resolve(results))
      .catch(err => reject(err))
  })
}