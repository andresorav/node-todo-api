const mongoose = require('mongoose');
const User = mongoose.model('User', {
  email: {
    required: true,
    minlength: 1,
    type: String,
    trim: true
  }
});

module.exports = {User}
