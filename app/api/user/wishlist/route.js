import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import Movie from '../../../../lib/models/movie';
import User from '../../../../lib/models/user';

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req) {
  const body = await req.json();
  const { movieId, userId } = body[0];
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { wishlist: movieId } },
      { new: true }
    ).populate('wishlist');

    return NextResponse.json({ status: 200, user: updatedUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while adding to wishlist' },
      { status: 500 }
    );
  }
}
