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
    select: true,
    default: null
  },
  organizationId: {
    type: Schema.Types.ObjectId, 
    ref: 'Organization', 
    select: true,
    default: null
  },
  createdBy: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    select: true,
    default: null
  },
  updatedBy: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    select: true,
    default: null
  }
}, { timestamps: true })

module.exports = model('User', userSchema, 'user')