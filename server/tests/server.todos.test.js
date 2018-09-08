const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {ToDo} = require('./../models/todo');

const {populateToDos, todos} = require('./seed/seed');

beforeEach(populateToDos);

describe('POST /todos', () => {
  it('should create new todo', (done) => {
    let text = 'Some random text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(201)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        ToDo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => done(err));
      })
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        ToDo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((err) => done(err));
      })
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo by id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if not found', (done) => {
    let id = new ObjectId().toHexString();

    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for invalid id', (done) => {
    let id = 'someRandomInvalidId';

    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  })
});

describe('DELETE /todos/:id', () => {
  it('should delete todo by id', (done) => {
    let id = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        ToDo.findById(id).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((err) => console.log(err));
      });
  });

  it('should return 404 if deleted todo is not found', (done) => {
    let id = new ObjectId();

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 on invalid id', (done) => {
    let id = 'someRandomInvalidHashId';

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should find and patch todo by id', (done) => {
    let id = todos[1]._id.toHexString();
    let todo = {
      completed: true,
      text: 'Updated text'
    };

    request(app)
      .patch(`/todos/${id}`)
      .send(todo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todo.text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeTruthy();
      })
      .end(done);
  });

  it('should clear completedAt if completed is not completed', (done) => {
    let id = todos[0]._id.toHexString();
    let todo = {
      completed: false,
      text: 'Text update 2'
    };

    request(app)
      .patch(`/todos/${id}`)
      .send(todo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todo.text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done);
  });
});
