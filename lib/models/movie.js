import mongoose, { Schema } from 'mongoose';
export const movieSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  distributer: { type: Schema.Types.ObjectId, ref: 'Distributer' },
  numberOfTickets: Number,
  releaseDate: Date,
  poster: String, //url
  availableFor: Number, //number of days
});

export default mongoose.models.Movie || mongoose.model('Movie', movieSchema);
