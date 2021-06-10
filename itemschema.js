const mongoose = require("mongoose");

const todoItemTemplate = new mongoose.Schema({
  todoItem: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("myTable",todoItemTemplate);