import mongoose, { Schema } from 'mongoose';
export const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: Number,
  distributer: { type: Schema.Types.ObjectId, ref: 'Distributer' },
  numberOfTickets: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  poster: String, //url
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  description: String,
  availableFor: Number, //number of days
});

export default mongoose.models.Movie || mongoose.model('Movie', movieSchema);
