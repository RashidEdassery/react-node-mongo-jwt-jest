const request = require('supertest');
const httpStatus = require('http-status');
const faker = require('faker');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { User } = require('../../src/models');

let newUserId = '';
let newToken = '';

setupTestDB();

describe('User routes', () => {
  describe('GET /v1/users/', () => {
    const _name = faker.name.findName();
    const _email = faker.internet.email();
    const _password = faker.internet.password(8);
    let newUser;
    beforeEach(() => {
      newUser = {
        name: _name,
        email: _email,
        password: _password,
      };
    });

    test('should create a new user and return 201', async () => {
      const res = await request(app).post('/v1/users/create').send(newUser).expect(httpStatus.CREATED);
      expect(res.body.user).not.toHaveProperty('password');
      expect(res.body.user).toEqual({ id: expect.anything(), name: newUser.name, email: newUser.email.toLowerCase() });

      const dbUser = await User.findById(res.body.user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({ name: newUser.name, email: newUser.email.toLowerCase() });
    });

    test('should return 400 error if email is already used', async () => {
      await request(app).post('/v1/users/create').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';
      await request(app).post('/v1/users/create').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return validation error with code 500, when incorrect email is used', async () => {
      newUser.email = 'invalidEmail';
      const res = await request(app).post('/v1/users/create').send(newUser);
      expect(res.body.code).toBe(500);
    });

    test('should authenticate user and return 200 for valid credentials', async () => {
      const res = await request(app)
        .post('/v1/users/authenticate')
        .send({
          email: newUser.email,
          password: newUser.password,
        })
        .expect(httpStatus.OK);
      newUserId = res.body.user.id;
      newToken = res.body.token;
    });

    test('should return 401 for invalid credentials', async () => {
      await request(app)
        .post('/v1/users/authenticate')
        .send({
          email: _email,
          password: 'WrongPassword',
        })
        .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /v1/users/:id', () => {
    test('should return 200 and the user object if data is ok', async () => {
      await request(app)
        .get(`/v1/users/${newUserId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .send()
        .expect(httpStatus.OK);
    });

    test('should return 401 error if invalid token is provided', async () => {
      const invalidToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmRkOGIyYjhiMDBjZTE2YjQ2ZmM4YTMiLCJpYXQiOjE2MDgzNjAwOTIsImV4cCI6MTYwODk2NDg5Mn0.8UL4aAeh9UFTe5wnXe0Aw5fyVxpa3k2Mmm66NVmF4jk';
      await request(app)
        .get(`/v1/users/${newUserId}`)
        .set('Authorization', `Bearer ${invalidToken}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      await request(app)
        .get('/v1/users/invalidId')
        .set('Authorization', `Bearer ${newToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user is not found', async () => {
      await request(app)
        .get(`/v1/users/5fc2910a83de315a243f0a71`)
        .set('Authorization', `Bearer ${newToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
