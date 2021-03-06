const { Schema, model} = require('mongoose')

const fiturSchema = Schema({
  nama: {
    type: String,
    required: true,
    select: true
  },
  deskripsi: {
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
    select: true,
    default: 0
  },
  estimasiHarga: {
    type: Number,
    required: true,
    select: true,
    default: 0
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

module.exports = model('Fitur', fiturSchema, 'fitur')