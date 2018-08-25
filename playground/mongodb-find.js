const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/ToDoApp';
const params = {useNewUrlParser: true};

MongoClient.connect(url, params, (err, client) => {
  if (err) {
    throw new Error('Failed to connect to MongoDB server');
  }

  const db = client.db('ToDoApp');

  /*db.collection('ToDos').find({
      _id: new ObjectID('5b6eb6d8ced1bb819b356628'),
      completed: false
  }).toArray().then((docs) => {
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
      console.log('Failed to fetch documents', err);
  });*/

  /*db.collection('ToDos').find({
     completed: false,
  }).count().then((count) => {
      console.log(`ToDos count: ${count}`);
  }, (err) => {
      console.log('Failed to fetch documents', err);
  });*/

  db.collection('Users').insertOne({
    name: "Andres",
    password: "Random Password",
    username: "SomeRandomUsername"
  }, (err, results) => {
    if (err) {
      throw new Error('Failed to insert new user into users');
    }

    console.log(JSON.stringify(results.ops, undefined, 2));
  });

  db.collection('Users').find({
    name: 'Andres Orav',
  }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Failed to fetch documents', err);
  });

  client.close();
});
