import mongoose from 'mongoose';
export const movieSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  numberOfTickets: Number,
  releaseDate: Date,
  poster: String, //url
  availableFor: Number, //number of days
});

let Movie;
try {
  // Check if the model already exists
  Movie = mongoose.model('Movie');
} catch (error) {
  // If not, define the model
  Movie = mongoose.model('Movie', movieSchema);
}

export default Movie;
