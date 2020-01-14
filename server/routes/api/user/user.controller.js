let User = require('./user.model')
const { query, parseWhere, createError } = require('../../helpers')
const { hash, compare } = require('bcrypt')

module.exports = {
  findAll: (req, res, next) => {
    const { where, limit, offset, sort } = query(req.query)
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
      .populate('roles', 'nama deskripsi prioritas')
      .populate('createdBy', 'nama')
      .populate('updatedBy', 'nama')
    
    Promise.all([count, data])
      .then(cb=>{
        res.json({
            count: cb[0],
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