const { Schema, model} = require('mongoose')

const voteSchema = Schema({
  kesulitan: {
    type: Number,
    required: true,
    select: true
  },
  harga: {
    type: Number,
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

module.exports = model('Vote', voteSchema, 'vote')