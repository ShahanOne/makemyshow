import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import Movie from '../../../../lib/models/movie';
import Distributer from '../../../../lib/models/distributer';

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req) {
  const body = await req.json();
  const { distributerId } = body[0];
  try {
    const foundDistributer = await Distributer.findOne({ _id: distributerId })
      .populate('listedMovies')
      .exec();

    if (!foundDistributer) {
      return NextResponse.json({
        status: 401,
        message: 'Distributer not found',
      });
    }

    return NextResponse.json({ status: 200, distributer: foundDistributer });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while fetching Distributer' },
      { status: 500 }
    );
  }
}
