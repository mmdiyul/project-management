const { Schema, model} = require('mongoose')

const organizationSchema = Schema({
  nama: {
    type: String,
    required: true,
    select: true
  },
  alamat: {
    type: String,
    required: false,
    select: true
  },
  telepon: {
    type: String,
    required: false,
    trim: true,
    select: true
  },
  email: {
    type: String,
    required: false,
    trim: true,
    select: true
  },
  website: {
    type: String,
    required: false,
    trim: false,
    select: true
  },
  createdBy: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    select: true,
    required: true,
    default: null
  },
  updatedBy: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    select: true,
    required: true,
    default: null
  }
}, { timestamps: true })

module.exports = model('Orgainzation', organizationSchema, 'organization')