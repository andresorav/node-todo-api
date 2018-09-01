const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;


mongoose.Promise = global.Promise;
console.log('Connect to: ', url);
mongoose.connect(url, { useNewUrlParser: true });

module.exports = {mongoose};


