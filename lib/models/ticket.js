import mongoose, { Schema } from 'mongoose';

export const ticketSchema = new mongoose.Schema({
  movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  price: { type: Number, required: true },
});

export default mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
