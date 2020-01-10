const { Schema, model} = require('mongoose')

const userSchema = Schema({
  nama: {
    type: String,
    required: true,
    select: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    default: null,
    unique: true,
    select: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    default: null,
    unique: true,
    select: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: true
  },
  roleId: {
    type: Schema.Types.ObjectId, 
    ref: 'Roles', 
    select: true
  },
  organizationId: {
    type: Schema.Types.ObjectId, 
    ref: 'Organization', 
    select: true
  },
  createdBy: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    select: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    select: true
  }
}, { timestamp: true })

module.exports = model('User', userSchema, 'user')