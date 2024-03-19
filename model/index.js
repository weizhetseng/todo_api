const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
  {
    title: String,
    status: Boolean,
    createdTime: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    versionKey: false,
  }
)

const Todo = mongoose.model('todo', todoSchema)

module.exports = Todo
