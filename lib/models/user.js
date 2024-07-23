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
    trim: true, // Remove whitespaces
    lowercase: true, // Convert to lowercase
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: true,
  },
  boughtTickets: { type: [Schema.Types.ObjectId], ref: 'Ticket' },
  wishlistedTickets: { type: [Schema.Types.ObjectId], ref: 'Ticket' },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
