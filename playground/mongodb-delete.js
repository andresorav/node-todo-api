const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/ToDoApp';
const params = { useNewUrlParser: true };
const collectionName = 'ToDos';

MongoClient.connect(url, params, (err, client) => {
    if (err) {
        throw new Error('Failed to connect to MongoDB server');
    }

    const db = client.db('ToDoApp');

    db.collection(collectionName).insertMany([{
        text: 'SomeRandomToDoText1',
        completed: false
    }, {
        text: 'SomeRandomToDoText2',
        completed: false
    }, {
        text: 'SomeRandomToDoText2',
        completed: false
    }, {
        text: 'SomeRandomToDoText3',
        completed: true
    }])
    .then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });

    // db.collection('ToDos').deleteMany({
    //     text: 'SomeRandomToDoText'
    // }).then((results) => {
    //     console.log(JSON.stringify(results, undefined, 2));
    // });

    // db.collection(collectionName).deleteOne({
    //     text: 'SomeRandomToDoText'
    // }).then((results) => {
    //     console.log(JSON.stringify(results, undefined, 2));
    // });

    // db.collection(collectionName).findOneAndDelete({
    //     text: 'SomeRandomToDoText'
    // }).then((results) => {
    //     console.log(JSON.stringify(results, undefined, 2));
    // });

    db.collection(collectionName).deleteMany({
        text: 'SomeRandomToDoText2'
    }).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });

    db.collection(collectionName).findOneAndDelete({
        completed: true
    }).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });

    client.close();
});