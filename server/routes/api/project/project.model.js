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
  }
}, { timestamps: true })

module.exports = model('Project', projectSchema, 'project')