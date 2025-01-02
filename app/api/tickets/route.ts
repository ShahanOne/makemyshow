//get tickets for a movie           GET
//generate tickets for a movie      POST
//buying of tickets for a movie     POST

import { NextResponse } from 'next/server';
import { connectDB } from '../../../utils/db';
import User from '../../../lib/models/user';

let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

export async function POST(req) {
  const body = await req.json();
  const { useId } = body[0];
  try {
    const foundUser = await User.findOne({ _id: useId });

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
