require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _ = require('lodash');

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
    res.status(201).send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  ToDo.find().then((todos) => {
    res.send({todos});
  }).catch((err) => {
    res.status(400).send(err)
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(404).send();
  }

  ToDo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo})
    })
    .catch(() => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  ToDo.findByIdAndDelete(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.status(200).send({todo});
    })
    .catch((err) => console.log(err.message));
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = (new Date()).getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  ToDo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.status(200).send({todo});
    })
    .catch(() => res.status(400).send());
});

app.listen(process.env.PORT, () => {
  console.log('Server started');
});

module.exports = {app};
