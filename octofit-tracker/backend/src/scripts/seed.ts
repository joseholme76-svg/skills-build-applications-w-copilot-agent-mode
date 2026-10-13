import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

// Seed the octofit_db database with test data
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [octocats, stars] = await Team.insertMany([
      { name: 'Octocats', description: 'Move together, get stronger together.' },
      { name: 'Code Stars', description: 'Small steps, stellar progress.' },
    ]);
    const users = await User.insertMany([
      { name: 'Mona', email: 'mona@example.com', team: octocats._id },
      { name: 'Ada', email: 'ada@example.com', team: octocats._id },
      { name: 'Linus', email: 'linus@example.com', team: stars._id },
    ]);

    await Promise.all([
      Team.updateOne({ _id: octocats._id }, { $set: { members: [users[0]._id, users[1]._id] } }),
      Team.updateOne({ _id: stars._id }, { $set: { members: [users[2]._id] } }),
    ]);

    await Activity.insertMany([
      { user: users[0]._id, activityType: 'Run', durationMinutes: 30, distanceKm: 5, points: 50 },
      { user: users[1]._id, activityType: 'Cycle', durationMinutes: 45, distanceKm: 12, points: 45 },
      { user: users[2]._id, activityType: 'Walk', durationMinutes: 40, distanceKm: 3, points: 30 },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: octocats._id, points: 50, rank: 1, period: 'weekly' },
      { user: users[1]._id, team: octocats._id, points: 45, rank: 2, period: 'weekly' },
      { user: users[2]._id, team: stars._id, points: 30, rank: 3, period: 'weekly' },
    ]);

    await Workout.insertMany([
      {
        name: 'Easy Run',
        description: 'A relaxed run at a conversational pace.',
        activityType: 'Run',
        durationMinutes: 25,
        difficulty: 'beginner',
      },
      {
        name: 'Steady Ride',
        description: 'A continuous cycling session at a moderate effort.',
        activityType: 'Cycle',
        durationMinutes: 40,
        difficulty: 'intermediate',
      },
      {
        name: 'Bodyweight Circuit',
        description: 'A full-body strength circuit using bodyweight exercises.',
        activityType: 'Strength',
        durationMinutes: 20,
        difficulty: 'beginner',
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
