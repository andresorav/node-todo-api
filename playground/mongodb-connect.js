const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017/ToDoApp';
const params = { useNewUrlParser: true };

MongoClient.connect(url, params, (err, client) => {
    if (err) {
        throw new Error('Failed to connect to MongoDB server');
    }

    const db = client.db('ToDoApp');

    /*db.collection('Users').insertOne({
        name: 'Peeter Meeter',
        username: 'kalamaja',
        password: 'RandomPasswordHash',
        created: (new Date()).toDateString()
    }, (err, results) => {
        if (err) {
            throw new Error('Failed to insert document into Users collection');
        }

        console.log(JSON.stringify(results.ops[0]['_id'].getTimestamp(), undefined, 2));
    });*/

    client.close();
});