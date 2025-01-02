import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '../../../../utils/db';
import Distributer from '../../../../lib/models/distributer';
connectDB();

export async function POST(req) {
  const body = await req.json();
  const { username, email, password } = body[0];
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const distributer = new Distributer({
      username: username,
      email: email,
      password: hash,
    });

    const savedDistributer = await distributer.save();
    return NextResponse.json({
      status: 200,
      message: 'Distributer created successfully',
      distributer: savedDistributer,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: 'Error creating Distributer',
      error: error,
    });
  }
}
