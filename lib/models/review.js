import mongoose, { Schema } from 'mongoose';
export const reviewSchema = new mongoose.Schema({
  review: { type: String, required: true },
  stars: Number,
  upvotes: Number,
  downvotes: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
