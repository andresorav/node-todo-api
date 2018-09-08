const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');
const {ToDo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const todos = [{
  _id: new ObjectId(),
  text: 'Some random text 1',
  completed: false
}, {
  _id: new ObjectId(),
  text: 'Some random text 2',
  completed: false
}];

const userIdOne = new ObjectId();
const userIdTwo = new ObjectId();

const users = [{
  _id: userIdOne,
  email: 'andres@orav.eu',
  password: 'SomeRandomPassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userIdOne.toHexString(), access: 'auth'}, 'saltySalt12345').toString()
  }]
}, {
  _id: userIdTwo,
  email: 'testikas@orav.eu',
  password: 'TestPassword12345'
}];


const populateToDos = (done) => {
  ToDo.remove({}).then(() => {
    return ToDo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {todos, populateToDos, users, populateUsers};
