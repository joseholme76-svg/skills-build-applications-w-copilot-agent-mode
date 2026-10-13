import express, { type ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const app = express();
export const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const allowedOrigins = new Set([
  'http://localhost:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

app.use((request, response, next) => {
  const origin = request.get('origin');
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }
  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.sendStatus(204);
    return;
  }
  next();
});
app.use(express.json());

app.get('/api/health', (_request, response) => {
  const connected = mongoose.connection.readyState === 1;
  response.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'unavailable',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().populate('team', 'name').lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name email').lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(
    await Activity.find()
      .populate('user', 'name email')
      .sort({ date: -1 })
      .lean(),
  );
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .populate('user', 'name')
      .populate('team', 'name')
      .sort({ period: 1, rank: 1 })
      .lean(),
  );
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ name: 1 }).lean());
});

const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'The API request could not be completed.' });
};

app.use(errorHandler);

export default app;
