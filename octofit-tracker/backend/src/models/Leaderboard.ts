import { model, Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    points: { type: Number, min: 0, required: true, default: 0 },
    rank: { type: Number, min: 1, required: true },
    period: { type: String, enum: ['weekly', 'all-time'], default: 'weekly' },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, user: 1 }, { unique: true });

export default model('Leaderboard', leaderboardSchema);
