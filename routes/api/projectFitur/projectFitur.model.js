const { Schema, model} = require('mongoose')

const projectFiturSchema = Schema({
  projectId: {
    type: Schema.Types.ObjectId, 
    ref: 'Project', 
    select: true
  },
  fiturId: {
    type: Schema.Types.ObjectId, 
    ref: 'Fitur', 
    select: true
  }
})

module.exports = model('ProjectFitur', projectFiturSchema, 'projectFitur')