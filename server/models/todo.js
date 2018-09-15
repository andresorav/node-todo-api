const mongoose = require('mongoose');
const ToDo = mongoose.model('ToDo', {
  text: {
    required: true,
    minlength: 1,
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = {ToDo}
