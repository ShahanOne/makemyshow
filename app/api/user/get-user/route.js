import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import Movie from '../../../../lib/models/movie';
import Ticket from '../../../../lib/models/ticket';
import User from '../../../../lib/models/user';

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req) {
  const body = await req.json();
  const { userId } = body[0];
  try {
    const foundUser = await User.findOne({ _id: userId })
      .populate({
        path: 'boughtTickets',
        populate: {
          path: 'movie',
          model: 'Movie',
        },
      })
      .populate({
        path: 'wishlist',
        populate: {
          path: 'movie',
          model: 'Movie',
        },
      })
      .exec();

    if (!foundUser) {
      return NextResponse.json({ status: 401, message: 'User not found' });
    }

    return NextResponse.json({ status: 200, user: foundUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while fetching user' },
      { status: 500 }
    );
  }
}
