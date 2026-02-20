const request = require('supertest');
const app = require('../app');
const knex = require('../db');

const TEST_USER = {
  email: 'maint@example.com',
  password: 'maintpass'
};

let token;
let trx;

describe('Backend API', () => {
  beforeAll(async () => {
    trx = await knex.transaction();
    app.locals.knex = trx;
    const res = await request(app)
      .post('/login')
      .send(TEST_USER);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  afterAll(async () => {
    await trx.rollback();
    await knex.destroy();
  });

  it('GET / should return 200 and a response', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBeDefined();
  });

  it('gets buildings', async () => {
    const res = await request(app)
      .get('/buildings')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('gets buildings by campus ID', async () => {
    const res = await request(app)
      .get('/buildings/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  it('gets smart trash', async () => {
    const res = await request(app)
      .get('/smart_trash')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('patches smart trash by ID', async () => {
    const res = await request(app)
      .patch('/smart_trash/1')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect([200, 204]).toContain(res.statusCode);
  });

  it('posts notifications', async () => {
    const res = await request(app)
      .post('/notifications/all')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Hello!', body: 'This is a test notification for all users' });
    expect([200, 201]).toContain(res.statusCode);
  });

  it('marks notification as read', async () => {
    const res = await request(app)
      .put('/notifications/2/mark-read')
      .set('Authorization', `Bearer ${token}`)
      .send({ notificationIds: [6, 7], read: 'true' });
    expect([200, 204]).toContain(res.statusCode);
  });

  it('registers push token', async () => {
    const res = await request(app)
      .post('/push-token/register')
      .set('Authorization', `Bearer ${token}`)
      .send({ userID: 2, expo_push_token: 'ExponentPushToken[fakeToken222]' });
    expect([200, 201]).toContain(res.statusCode);
  });

  it('empties smart trash', async () => {
    const res = await request(app)
      .put('/smart_trash/1/empty')
      .set('Authorization', `Bearer ${token}`)
      .send({ alarm_treshold: '0' });
    expect([200, 204]).toContain(res.statusCode);
  });
});
