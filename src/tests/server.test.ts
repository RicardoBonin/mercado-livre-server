import express from 'express';
import request from 'supertest';
import dotenv from 'dotenv';
import cors from 'cors';
import route from '../routes/items.route';

const app = express();
dotenv.config();

const port = 0;

app.use(cors());
app.use(express.json());
app.use('/items', route);

const server = app.listen(port);

afterAll(() => {
  server.close();
});

describe('Server Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should respond with status code 200', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
  });
});
