const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {ToDo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//let id = '5b81141ceb3e650050ea3af8';

/*
ToDo.find({
  _id: id
}).then((todos) => {
  console.log('Found:', todos);
});
*/
/*
ToDo.findOne({
  _id: id
}).then((todo) => {
  if (!todo) {
    throw new Error('Id not found');
  }

  console.log('Found one:', todo);
});*/

/*if (!ObjectId.isValid(id)) {
  console.log('ObjectId is not valid');
}

ToDo.findById(id).then((todo) => {
  console.log('Found by id:', todo);
}).catch((err) => {
  console.log('Got an error:', err.message);
});*/


let id = '5b811cf684bea07629545845';
User.findById(id)
  .then((user) => {
    if (!user) {
      throw new Error('User couldn\'t be found');
    }

    console.log('Found a user:', user);
  })
  .catch((err) => console.log('Got an error: ', err.message));

