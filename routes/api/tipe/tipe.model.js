const { Schema, model} = require('mongoose')

const tipeSchema = Schema({
  nama: {
    type: String,
    required: true,
    select: true
  },
  deskripsi: {
    type: String,
    required: false,
    select: true
  }
})

module.exports = model('Tipe', tipeSchema, 'tipe')