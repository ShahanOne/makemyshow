import mongoose, { Schema } from 'mongoose';
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
  listedMovies: { type: [Schema.Types.ObjectId], ref: 'Movie' },
});

export default mongoose.models.Distributer ||
  mongoose.model('Distributer', distributerSchema);
