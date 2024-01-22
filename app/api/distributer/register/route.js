import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '../../../../utils/db';
import Distributer from '@/lib/models/distributer';
connectDB();

const saltRounds = 20;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export async function POST(req) {
  const { username, email, password } = await req.json();
  const hashedPassword = await hashPassword(password);

  const distributer = new Distributer({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    const newDistributer = await distributer.save();
    return NextResponse.json(newDistributer);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while creating User' },
      { status: 500 }
    );
  }
}
