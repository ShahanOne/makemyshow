import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '../../../utils/db';
import Movie from '../../../lib/models/movie';
connectDB();

export async function GET() {
  try {
    const foundMovies = await Movie.find({}).populate('distributer');
    return NextResponse.json(foundMovies);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while fetching movies' },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  const body = await req.json();

  const {
    name,
    duration,
    distributerId,
    numberOfTickets,
    releaseDate,
    poster,
    availableFor,
  } = body[0];

  const movie = new Movie({
    name: name,
    duration: duration,
    distributer: distributerId,
    numberOfTickets: numberOfTickets,
    releaseDate: releaseDate ? new Date(releaseDate) : undefined,
    poster: poster,
    availableFor: availableFor,
  });
  try {
    const newMovie = await movie.save();
    const populatedMovie = await newMovie.populate('distributer');
    return NextResponse.json({
      status: 200,
      movie: populatedMovie,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while saving movie' },
      { status: 500 }
    );
  }
}
