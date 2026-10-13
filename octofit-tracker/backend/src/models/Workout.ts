import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: {
      type: String,
      enum: ['Run', 'Walk', 'Cycle', 'Strength', 'Other'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
