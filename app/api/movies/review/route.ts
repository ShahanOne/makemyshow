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
  const { movieId, userId, review, stars } = body[0];
  try {
    const newReview = new Review({
      user: userId,
      review: review,
      stars: stars,
    });

    const savedReview = await newReview.save();
    const populatedReview = await newReview.populate('user');

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { $push: { reviews: savedReview._id } },
      { new: true }
    ).populate('reviews');

    return NextResponse.json({
      status: 200,
      message: 'Review added successfully',
      review: populatedReview,
      movie: updatedMovie,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while adding review' },
      { status: 500 }
    );
  }
}
