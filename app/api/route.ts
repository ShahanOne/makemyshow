import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../utils/db';
import mongoose from 'mongoose';

connectDB();

export async function GET() {
  const cats = [
    { name: 'Whiskers', info: 'Fluffy and playful.' },
    { name: 'Mittens', info: 'Loves to nap in sunbeams.' },
    { name: 'Shadow', info: 'Mysterious and adventurous.' },
    { name: 'Felix', info: 'Enjoys chasing feather toys.' },
    { name: 'Luna', info: 'Graceful and affectionate.' },
  ];
  return NextResponse.json(cats);
}
