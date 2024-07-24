import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import Movie from '../../../../lib/models/movie';
import Review from '../../../../lib/models/review';
let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req) {
  const body = await req.json();
  const { movieId } = body[0];
  try {
    const foundMovie = await Movie.findOne({ _id: movieId })
      .populate('reviews')
      .exec();

    if (!foundMovie) {
      return NextResponse.json({ status: 401, message: 'Movie not found' });
    }

    return NextResponse.json({ status: 200, movie: foundMovie });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while fetching movie' },
      { status: 500 }
    );
  }
}
