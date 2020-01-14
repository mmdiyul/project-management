const { Schema, model} = require('mongoose')

const reportSchema = Schema({
  pesan: {
    type: String,
    required: true,
    select: true
  },
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    select: true
  },
  fiturId: {
    type: Schema.Types.ObjectId, 
    ref: 'Fitur', 
    select: true
  }
}, { timestamps: true })

module.exports = model('Report', reportSchema, 'report')