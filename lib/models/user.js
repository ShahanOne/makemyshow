import mongoose from 'mongoose';
import { ticketSchema } from './ticket';
const userSchema = new mongoose.Schema({
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
  boughtTickets: [ticketSchema],
  wishlistedTickets: [ticketSchema],
});

let User;
try {
  // Check if the model already exists
  User = mongoose.model('User');
} catch (error) {
  // If not, define the model
  User = mongoose.model('User', userSchema);
}

export default User;
