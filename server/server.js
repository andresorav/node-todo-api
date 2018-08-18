const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ToDo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let newToDo = new ToDo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completed ? (new Date()).getTime() : null
    });

    newToDo.save().then((doc) => {
        res.send(doc);
    }).catch((err) => {
        throw new Error('Failed to save todo');
    });
});

app.get('/todos', (req, res) => {

});

app.listen(3000, () => {
    console.log('Server started');
});
