import mongoose from 'mongoose';
import { movieSchema } from './movie';
const distributerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
    trim: true, // Remove leading and trailing whitespaces
    lowercase: true, // Convert to lowercase
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: true,
  },
  listedMovies: [movieSchema],
});

let Distributer;
try {
  // Check if the model already exists
  Distributer = mongoose.model('Distributer');
} catch (error) {
  // If not, define the model
  Distributer = mongoose.model('Distributer', distributerSchema);
}

export default Distributer;
