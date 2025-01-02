import { NextResponse } from 'next/server';
import { connectDB } from '../../../utils/db';
import Distributer from '../../../lib/models/distributer';
connectDB();

export async function GET() {
  try {
    const foundDistributers = await Distributer.find({});
    return NextResponse.json(foundDistributers);
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred while fetching Distributers' },
      { status: 500 }
    );
  }
}
