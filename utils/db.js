import mongoose from 'mongoose';
import { movieSchema } from '../lib/models/movie';
import { ticketSchema } from '../lib/models/ticket';
import { distributerSchema } from '../lib/models/distributer';
import { userSchema } from '../lib/models/user';
import { reviewSchema } from '../lib/models/review';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useFindAndModify: false,
      //   useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};
