import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db.js';
import Movie from '../../../../lib/models/movie';
connectDB();

export async function POST(req) {
  const body = await req.json();
  const { distributerId } = body[0];
  try {
    const foundMovies = await Movie.find({
      distributer: distributerId,
    }).exec();
    return NextResponse.json(foundMovies);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while fetching movies' },
      { status: 500 }
    );
  }
}
