import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import bcrypt from 'bcrypt';
import Distributer from '../../../../lib/models/distributer';
connectDB();

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body[0];
  try {
    const foundDistributer = await Distributer.findOne({ email: email })
      .populate('listedMovies')
      .exec();

    if (!foundDistributer) {
      return NextResponse.json({
        status: 401,
        message: 'Distributer not found',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundDistributer.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json({ status: 401, message: 'Incorrect password' });
    }

    return NextResponse.json({ status: 200, distributer: foundDistributer });
  } catch (error) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      message: 'Error logging User',
      error: error,
    });
  }
}
