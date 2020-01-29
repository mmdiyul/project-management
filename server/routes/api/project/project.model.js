const { Schema, model} = require('mongoose')

const projectSchema = Schema({
  nama: {
    type: String,
    required: true,
    select: true
  },
  budget: {
    type: Number,
    required: true,
    select: true
  },
  totalHarga: {
    type: Number,
    required: true,
    select: true
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

module.exports = model('Project', projectSchema, 'project')