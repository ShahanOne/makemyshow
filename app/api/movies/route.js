import { NextResponse } from 'next/server';
import { parseBody } from 'next/dist/server/api-utils';
import mongoose from 'mongoose';
import { connectDB } from '../../../utils/db';
import Movie from '@/lib/models/movie';
connectDB();

export async function GET() {
  try {
    const foundMovies = await Movie.find({});
    return NextResponse.json(foundMovies);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while fetching movies' },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  const { body } = await parseBody(req);

  const { name, duration, numberOfTickets, releaseDate, poster, availableFor } =
    body;

  const movie = new Movie({
    name: name,
    duration: duration,
    numberOfTickets: numberOfTickets,
    releaseDate: releaseDate ? new Date(releaseDate) : undefined,
    poster: poster,
    availableFor: availableFor,
  });
  try {
    const newMovie = await movie.save();
    return NextResponse.json(newMovie);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while saving movie' },
      { status: 500 }
    );
  }
}
