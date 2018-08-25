const mongoose = require('mongoose');

const dbName = 'ToDos';
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`;


mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });

module.exports = {mongoose};
