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
}, { timestamp: true })

module.exports = model('Project', reportSchema, 'project')