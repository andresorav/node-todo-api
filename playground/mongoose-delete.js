const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {ToDo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const randomToDos = [{
  _id: new ObjectId(),
  text: 'Random ToDo 1'
}, {
  _id: new ObjectId(),
  text: 'Random ToDo 2'
}, {
  _id: new ObjectId(),
  text: 'Random ToDo 3'
}];


/*ToDo.insertMany(randomToDos).then((results) => {
  console.log('Inserted todos: %d', results.length);

  ToDo.deleteMany({})
    .then((results) => console.log('Deleted todos: %d', results.n))
}).catch((err) => console.log(err));*/

ToDo.insertMany(randomToDos).then((results) => {
  console.log('Inserted todos: %d', results.length);

  ToDo.findByIdAndDelete(randomToDos[0]._id.toHexString())
    .then((results) => console.log('Delete todo: ', results))
    .catch((err) => console.log(err));
});

