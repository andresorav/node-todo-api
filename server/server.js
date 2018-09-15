require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {ToDo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

let app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  let newToDo = new ToDo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completed ? (new Date()).getTime() : null,
    userId: req.user._id
  });

  newToDo.save().then((doc) => {
    res.status(201).send(doc);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', authenticate, (req, res) => {
  ToDo.find({
    userId: req.user._id
  }).then((todos) => {
    res.send({todos});
  }).catch((err) => {
    res.status(400).send(err)
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(404).send();
  }

  ToDo.findOne({userId: req.user._id, _id: id}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo})
  }).catch(() => res.status(400).send());
});

app.delete('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  ToDo.findOneAndDelete({userId: req.user._id, _id: id}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.status(200).send({todo});
  }).catch((err) => console.log(err.message));
});

app.patch('/todos/:id', authenticate, (req, res) => {
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

  ToDo.findOneAndUpdate({userId: req.user._id, _id: id}, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.status(200).send({todo});
  }).catch(() => res.status(400).send());
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])
  let user = new User(body);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      res.header('x-auth', token).status(201).send(user)
    })
    .catch((err) => res.status(400).send(err));
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).status(200).send(user)
      })
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }).catch((err) => {
    res.status(400).send();
  });
});

app.listen(process.env.PORT, () => {
  console.log('Server started');
});

module.exports = {app};
