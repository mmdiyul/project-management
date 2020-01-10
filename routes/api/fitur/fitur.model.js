const { Schema, model} = require('mongoose')

const fiturSchema = Schema({
  nama: {
    type: String,
    required: true,
    select: true
  },
  waktuPengerjaan: {
    type: Number,
    required: true,
    select: true
  },
  kesulitan: {
    type: Number,
    required: true,
    select: true
  },
  estimasiHarga: {
    type: Number,
    required: true,
    select: true
  },
  tipeId: {
    type: Schema.Types.ObjectId, 
    ref: 'Tipe', 
    select: true
  },
  parent: {
    type: Schema.Types.ObjectId, 
    ref: 'Fitur',
    default: null,
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

module.exports = model('Fitur', fiturSchema, 'fitur')