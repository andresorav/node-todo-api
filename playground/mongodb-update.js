const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/Playground';
const params = { useNewUrlParser: true };
const collectionName = 'Users';

MongoClient.connect(url, params, (err, client) => {
    if (err) {
        throw new Error('Failed to connect to MongoDB server');
    }

    const db = client.db('Playground');

    // db.collection(collectionName).insertMany([{
    //     name: 'Andres',
    //     age: 25,
    //     address: 'Tallinn'
    // }, {
    //     name: 'Peeter',
    //     age: 35,
    //     address: 'Tartu'
    // }]).then((results) => {
    //     console.log('Data inserted', results);
    // }).catch((err) => {
    //     console.log('Got an error', err);
    // });

    db.collection(collectionName).findOneAndUpdate({
        _id: new ObjectID('5b77e77492d296195d730916')
    }, {
        $set: {
            name: 'Joonas'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((results) => {
        console.log('Updated', results);
    }).catch((err) => {
        console.log('Got an error', err)
    });

    client.close();
});
