import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import bcrypt from 'bcrypt';
import User from '@/lib/models/user';
connectDB();

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email: email });
    const isPasswordCorrect = await verifyPassword(password, user.password);
    if (isPasswordCorrect) {
      return NextResponse.json(user);
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while logging User' },
      { status: 500 }
    );
  }
}
