import mongoose from 'mongoose';
import { movieSchema } from './movie';

export const ticketSchema = new mongoose.Schema({
  movie: [movieSchema],
});

let Ticket;
try {
  // Check if the model already exists
  Ticket = mongoose.model('Ticket');
} catch (error) {
  // If not, define the model
  Ticket = mongoose.model('Ticket', ticketSchema);
}

export default Ticket;
