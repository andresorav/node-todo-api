const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {User} = require('./../models/user');

const {populateUsers, users} = require('./seed/seed');

beforeEach(populateUsers);

describe('POST /users', () => {
  it('should create new user', (done) => {
    let userData = {
      email: 'some@email.ee',
      password: 'SomeRandomPassword'
    };

    request(app)
      .post('/users')
      .send(userData)
      .expect(201)
      .expect((res) => {
        expect(res.body.email).toBe(userData.email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.find({email: userData.email}).then((users) => {
          expect(users.length).toBe(1);
          expect(users[0].email).toBe(userData.email);
          done();
        }).catch((err) => done(err));
      })
  });

  it('should not create user with invalid body data', (done) => {
    request(app)
      .post('/users')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.find().then((users) => {
          expect(users.length).toBe(2);
          done();
        }).catch((err) => done(err));
      })
  });
});

describe('GET /users', () => {
  it('should get all users', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body.users.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user when authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});
