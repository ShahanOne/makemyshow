import { NextResponse } from 'next/server';
import { connectDB } from '../../../../utils/db';
import bcrypt from 'bcrypt';
import Distributer from '@/lib/models/distributer';
connectDB();

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const distributer = await Distributer.findOne({ email: email });
    const isPasswordCorrect = await verifyPassword(
      password,
      distributer.password
    );
    if (isPasswordCorrect) {
      return NextResponse.json(distributer);
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while logging Distributer' },
      { status: 500 }
    );
  }
}
