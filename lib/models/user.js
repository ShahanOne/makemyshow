import mongoose, { Schema } from 'mongoose';
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
  photo: String,
  boughtTickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
