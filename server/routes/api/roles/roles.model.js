const { Schema, model} = require('mongoose')

const rolesSchema = Schema({
  nama: {
    type: String,
    enum: ['superadmin', 'admin', 'developer'],
    lowercase: true,
    required: true,
    select: true
  },
  prioritas:{
     type: Number,
     required: true,
     default: 2
  },
  deskripsi: {
     type: String,
     required: false
  }
})

module.exports = model('Roles', rolesSchema, 'roles')