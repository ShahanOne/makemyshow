import { NextResponse } from 'next/server';
import { connectDB } from '../../../utils/db';
import User from '@/lib/models/user';
connectDB();

export async function GET() {
  try {
    const foundUsers = await User.find({});
    return NextResponse.json(foundUsers);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while fetching Users' },
      { status: 500 }
    );
  }
}
